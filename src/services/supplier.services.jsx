import axios from "axios";
import { API_URL } from "../config";

const baseUrl = `${API_URL}/supplier`;

const queryString = (filters) => {
  let queryString = "";

  for (const key in filters) {
    if (
      filters[key] !== null &&
      filters[key] !== undefined &&
      filters[key] !== ""
    ) {
      if (queryString.length > 0) {
        queryString += "&";
      }
      //to HEX for params
      queryString += `${key}=${encodeURIComponent(filters[key])}`;
    }
  }

  return queryString;
};

export const getSuppliersSearch = async (filters) => {
  try {
    let querySuppliers = "";
    if (filters != null) querySuppliers = queryString(filters);
    const response = await axios.get(`${baseUrl}?${querySuppliers}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error trying to get response from server for suppliers retrieve",
      error
    );
    return error.response.data;
  }
};

export const createSupplier = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error creating supplier:", error);
    return error.response.data;
  }
};

export const updateSupplier = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating supplier:", error);
    return error.response.data;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return error.response.data;
  }
};
