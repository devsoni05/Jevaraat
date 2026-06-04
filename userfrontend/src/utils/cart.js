import axios from "axios";

const API_BASE_URL = "https://jevaraat.onrender.com";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addItemToCart = async (item, category, quantity = 1) => {
  const response = await axios.post(
    `${API_BASE_URL}/cart/add`,
    {
      product_id: item._id,
      category,
      name: item.name,
      img_url: item.img_url,
      price: item.price,
      quantity,
      metal: item.metal,
      purity: item.purity,
      weight: item.weight,
      stone: item.stone,
      size: item.size,
      making_charge: item.making_charge,
    },
    getAuthConfig(),
  );

  return response.data;
};

export const fetchCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`, getAuthConfig());
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/cart/item/${itemId}`,
    getAuthConfig(),
  );

  return response.data;
};
