import axios from "api/axios";

export const fetchWord = async (wordValue) => {
  try {
    const response = await axios.get(`${wordValue}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
