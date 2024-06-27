import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/user`;

export const authenticateUser = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/auth`, data);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error trying to get response from server for authentication:",
      error
    );
    return null;
  }
};
