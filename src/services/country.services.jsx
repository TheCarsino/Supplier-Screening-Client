import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/country`;

export const getCountriesList = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error trying to get response from server for suppliers retrieve",
      error
    );
    return error;
  }
};
