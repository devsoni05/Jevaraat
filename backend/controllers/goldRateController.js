const getGoldRate = async (req, res) => {
  try {
    const response = await fetch("https://api.gold-api.com/price/XAU");

    if (!response.ok) {
      return res.status(502).json({ msg: "Unable to fetch live gold rate" });
    }

    const data = await response.json();
    const pricePerOunceUsd = Number(data.price);
    const inrRate = Number(data.exchange_rate);

    if (!pricePerOunceUsd || !inrRate) {
      return res.status(502).json({ msg: "Invalid gold rate response" });
    }

    const pricePerOunceInr = pricePerOunceUsd * inrRate;
    const price24kPerGram = pricePerOunceInr / 31.1035;
    const price22kPerGram = price24kPerGram * 0.916;

    res.json({
      source: "gold-api.com",
      currency: "INR",
      price_per_ounce_inr: pricePerOunceInr,
      price_24k_per_gram: price24kPerGram,
      price_22k_per_gram: price22kPerGram,
      updated_at: data.timestamp
        ? new Date(data.timestamp).toISOString()
        : new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getGoldRate,
};
