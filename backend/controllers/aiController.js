const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "gemini-2.5-flash";
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");
const FALLBACK_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];

const askInventoryAssistant = async (req, res) => {
  try {
    const { query } = req.body;
    const inventory = parseInventory(req.body.inventory);
    const uploadedFiles = formatUploadedFiles(req.files);
    const exactInventoryMatches = findExactInventoryImageMatches(
      uploadedFiles,
      inventory,
    );
    const catalogImageParts = buildCatalogImageParts(
      inventory,
      query,
      uploadedFiles,
    );

    if ((!query || !query.trim()) && uploadedFiles.length === 0) {
      return res.status(400).json({ message: "Query is required" });
    }

    if (!inventory || typeof inventory !== "object") {
      return res.status(400).json({ message: "Inventory object is required" });
    }

    if (exactInventoryMatches.length > 0 && asksForExactMatch(query)) {
      return res.json({
        answer: buildExactMatchAnswer(exactInventoryMatches),
        exactInventoryMatches,
        files: uploadedFiles.map(toPublicFile),
        model: "exact-file-match",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        message: "GEMINI_API_KEY is not configured on the backend",
      });
    }

    const models = buildModelFallbacks(process.env.GEMINI_MODEL);
    const requestBody = buildGeminiRequestBody(
      query,
      inventory,
      uploadedFiles,
      exactInventoryMatches,
      catalogImageParts,
    );
    const { responseData, model } = await generateWithFallbacks(
      models,
      requestBody,
      process.env.GEMINI_API_KEY,
    );

    res.json({
      answer: extractGeminiText(responseData),
      exactInventoryMatches,
      files: uploadedFiles.map(toPublicFile),
      model,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const parseInventory = (inventory) => {
  if (typeof inventory === "string") {
    try {
      return JSON.parse(inventory);
    } catch (err) {
      const parseError = new Error("Inventory must be valid JSON");
      parseError.statusCode = 400;
      throw parseError;
    }
  }

  return inventory;
};

const formatUploadedFiles = (files = []) =>
  files.map((file) => ({
    originalName: file.originalname,
    fileName: file.filename,
    localPath: file.path,
    mimeType: file.mimetype,
    size: file.size,
    url: `/uploads/assistant/${file.filename}`,
  }));

const toPublicFile = ({ localPath, ...file }) => file;

const findExactInventoryImageMatches = (uploadedFiles, inventory) => {
  const uploadedImageHashes = uploadedFiles
    .filter((file) => file.mimeType.startsWith("image/"))
    .map((file) => ({
      fileName: file.originalName,
      hash: getFileHash(file.localPath),
    }))
    .filter((file) => file.hash);

  if (uploadedImageHashes.length === 0) {
    return [];
  }

  const inventoryImages = flattenInventory(inventory)
    .filter((item) => item.img_url)
    .map((item) => {
      const imagePath = findInventoryImagePath(item.img_url);

      return {
        hash: getFileHash(imagePath),
        product: {
          ...item,
          img_url: item.img_url,
          imageUrl: `/uploads/${item.img_url}`,
        },
      };
    })
    .filter((item) => item.hash);

  return uploadedImageHashes.flatMap((uploadedFile) =>
    inventoryImages
      .filter((inventoryImage) => inventoryImage.hash === uploadedFile.hash)
      .map((inventoryImage) => ({
        uploadedFileName: uploadedFile.fileName,
        matchType: "exact_file_hash",
        product: inventoryImage.product,
      })),
  );
};

const asksForExactMatch = (query = "") => {
  const normalizedQuery = query.toLowerCase();

  return (
    normalizedQuery.includes("exact") ||
    normalizedQuery.includes("same") ||
    normalizedQuery.includes("find") ||
    normalizedQuery.includes("match") ||
    normalizedQuery.includes("this")
  );
};

const buildExactMatchAnswer = (matches) => {
  const product = matches[0].product;
  const details = [
    product.category && `category: ${product.category}`,
    product.metal && `metal: ${product.metal}`,
    product.purity && `purity: ${product.purity}`,
    product.weight && `weight: ${product.weight}`,
    product.size && `size: ${product.size}`,
    product.stone && `stone: ${product.stone}`,
    product.price !== undefined && `price: ${product.price}`,
    product.making_charge !== undefined &&
      `making charge: ${product.making_charge}`,
  ].filter(Boolean);

  return `Yes, I found the exact matching listing: ${product.name || "this product"}. ${details.join(", ")}.`;
};

const findInventoryImagePath = (imgUrl) => {
  const fileName = path.basename(imgUrl || "");
  const candidatePaths = [
    path.join(UPLOADS_DIR, fileName),
    path.join(process.cwd(), "uploads", fileName),
    path.join(__dirname, "..", "..", "uploads", fileName),
  ];

  return candidatePaths.find((candidatePath) => fs.existsSync(candidatePath));
};

const getFileHash = (filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      return null;
    }

    return crypto
      .createHash("sha256")
      .update(fs.readFileSync(filePath))
      .digest("hex");
  } catch (err) {
    return null;
  }
};

const flattenInventory = (inventory) =>
  Object.entries(inventory || {}).flatMap(([category, items]) => {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map((item) => ({
      ...item,
      category,
    }));
  });

const buildCatalogImageParts = (inventory, query = "", uploadedFiles = []) => {
  const normalizedQuery = query.toLowerCase();
  const uploadedImageSizes = uploadedFiles
    .filter((file) => file.mimeType.startsWith("image/"))
    .map((file) => file.size);
  const catalogItems = prioritizeCatalogItems(
    flattenInventory(inventory),
    normalizedQuery,
    uploadedImageSizes,
  )
    .slice(0, 8)
    .flatMap((item) => {
      const imagePath = findInventoryImagePath(item.img_url);

      if (!imagePath) {
        return [];
      }

      const mimeType = getImageMimeType(imagePath);

      if (!mimeType) {
        return [];
      }

      return [
        {
          text: `Catalog image for product: ${JSON.stringify({
            _id: item._id,
            name: item.name,
            category: item.category,
            metal: item.metal,
            purity: item.purity,
            weight: item.weight,
            size: item.size,
            stone: item.stone,
            price: item.price,
            making_charge: item.making_charge,
            img_url: item.img_url,
          })}`,
        },
        {
          inlineData: {
            mimeType,
            data: fs.readFileSync(imagePath).toString("base64"),
          },
        },
      ];
    });

  return catalogItems;
};

const prioritizeCatalogItems = (items, normalizedQuery, uploadedImageSizes) => {
  const categoryHints = [
    ["ring", ["ring", "ladiesring"]],
    ["necklace", ["necklace"]],
    ["goldbar", ["goldbar"]],
    ["bar", ["goldbar"]],
  ];
  const matchedHint = categoryHints.find(([hint]) =>
    normalizedQuery.includes(hint),
  );

  const priorityCategories = matchedHint?.[1] || [];

  return [...items].sort((firstItem, secondItem) => {
    const firstPriority = scoreCatalogItem(firstItem, priorityCategories, uploadedImageSizes);
    const secondPriority = scoreCatalogItem(
      secondItem,
      priorityCategories,
      uploadedImageSizes,
    );

    return firstPriority - secondPriority;
  });
};

const scoreCatalogItem = (item, priorityCategories, uploadedImageSizes) => {
  const imagePath = findInventoryImagePath(item.img_url);
  const categoryScore =
    priorityCategories.length === 0 || priorityCategories.includes(item.category)
      ? 0
      : 1000000000;

  if (!imagePath || uploadedImageSizes.length === 0) {
    return categoryScore;
  }

  const imageSize = fs.statSync(imagePath).size;
  const closestSizeDifference = Math.min(
    ...uploadedImageSizes.map((size) => Math.abs(size - imageSize)),
  );

  return categoryScore + closestSizeDifference;
};

const getImageMimeType = (filePath) => {
  const fileDescriptor = fs.openSync(filePath, "r");
  const header = Buffer.alloc(12);
  fs.readSync(fileDescriptor, header, 0, header.length, 0);
  fs.closeSync(fileDescriptor);

  if (header.subarray(0, 2).equals(Buffer.from([0xff, 0xd8]))) {
    return "image/jpeg";
  }

  if (header.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))) {
    return "image/png";
  }

  if (
    header.subarray(0, 4).toString("ascii") === "RIFF" &&
    header.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }

  return null;
};

const buildModelFallbacks = (preferredModel) => {
  const models = [preferredModel || DEFAULT_MODEL, ...FALLBACK_MODELS];
  return [...new Set(models.filter(Boolean))];
};

const buildGeminiRequestBody = (
  query,
  inventory,
  uploadedFiles = [],
  exactInventoryMatches = [],
  catalogImageParts = [],
) => {
  const publicFiles = uploadedFiles.map(toPublicFile);

  return {
    systemInstruction: {
      parts: [
        {
          text: "You are JEVARAAT's jewelry shopping assistant. Answer the customer's question using the provided inventory JSON, exact inventory image matches, uploaded user images, and labeled catalog images. The uploaded user images appear before the labeled catalog images. If exactInventoryMatches is not empty, treat those products as the exact matching inventory items and recommend them first. If a labeled catalog image shows the same product as the uploaded user image, say you found the matching listing and name that product. Do not suggest a necklace when the matching catalog image is a ring. If exactInventoryMatches is empty and no catalog image shows the same product, say there is no exact match and only then suggest similar products. Mention useful details like name, category, metal, purity, weight, size, stone, price, and making charge. For non-image files, acknowledge them by name but do not claim to inspect hidden file contents. Keep replies concise and friendly.",
        },
      ],
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Customer question:\n${(query || "").trim() || "The customer uploaded files and wants assistance."}\n\nUploaded files:\n${JSON.stringify(
              publicFiles,
              null,
              2,
            )}\n\nExact inventory image matches:\n${JSON.stringify(
              exactInventoryMatches,
              null,
              2,
            )}\n\nInventory JSON:\n${JSON.stringify(inventory, null, 2)}`,
          },
          ...buildImageParts(uploadedFiles),
          ...catalogImageParts,
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1200,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  };
};

const buildImageParts = (uploadedFiles) =>
  uploadedFiles
    .filter((file) => file.mimeType.startsWith("image/"))
    .map((file) => ({
      inlineData: {
        mimeType: file.mimeType,
        data: fs.readFileSync(file.localPath).toString("base64"),
      },
    }));

const generateWithFallbacks = async (models, requestBody, apiKey) => {
  let lastError;

  for (const model of models) {
    const geminiResponse = await fetch(
      `${GEMINI_API_BASE_URL}/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    const responseData = await geminiResponse.json();

    if (geminiResponse.ok) {
      return { responseData, model };
    }

    const message =
      responseData.error?.message || "Gemini request failed. Try again.";
    lastError = new Error(message);
    lastError.statusCode = geminiResponse.status;

    if (!shouldTryFallback(geminiResponse.status, message)) {
      throw lastError;
    }
  }

  throw lastError || new Error("Gemini request failed. Try again.");
};

const shouldTryFallback = (statusCode, message) => {
  const normalizedMessage = message.toLowerCase();

  return (
    statusCode === 429 ||
    statusCode === 503 ||
    statusCode >= 500 ||
    normalizedMessage.includes("high demand") ||
    normalizedMessage.includes("overloaded") ||
    normalizedMessage.includes("try again later")
  );
};

const extractGeminiText = (responseData) => {
  const text = responseData.candidates
    ?.flatMap((candidate) => candidate.content?.parts || [])
    .map((content) => content.text)
    .filter(Boolean)
    .join("\n");

  return text || "I could not generate an answer right now.";
};

module.exports = {
  askInventoryAssistant,
};
