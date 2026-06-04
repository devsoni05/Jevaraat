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

export const placeOrderFromCart = async (itemId) => {
  const response = await axios.post(
    `${API_BASE_URL}/orders/from-cart/${itemId}`,
    {},
    getAuthConfig(),
  );

  return response.data;
};

export const fetchMyOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders/my`, getAuthConfig());
  return response.data;
};
