import axios from "axios";

const API_URL = "https://test.test/api/";

export const sendVote = async ({ roles, other }) => {
  try {
    const response = await axios.post(API_URL, {
      roles,
      other,
    });
    return response.data;
  } catch (error) {
   throw new Error("Ошибка при отправке ", error);
  }
};
