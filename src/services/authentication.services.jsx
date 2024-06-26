import axios from "axios";
//import { API_URL } from "../config";

//const baseUrl = `${API_URL}`;

export const authenticateUser = async (data) => {
  try {
    //const response = await axios.post(`${baseUrl}/authentication`, data);
    //return response.data;
    return [];
  } catch (error) {
    console.error(
      "Error trying to get response from server for authentication:",
      error
    );
    return null;
  }
};
