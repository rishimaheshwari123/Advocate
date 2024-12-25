import Swal from "sweetalert2";
import { apiConnector } from "../apiConnector";
import { ledger } from "../apis";


const {
  CREATE_LEDGER,
  GET_ALL_LEDGER
} = ledger;

export const createLedgerApi = async (formData) => {
  try {
    const response = await apiConnector("POST", CREATE_LEDGER, formData);
    Swal.fire("Success", response?.data?.message, "success");
    return response.data;
  } catch (error) {
    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
    console.error(error);
    return null;
  }
};

export const getAllLedgerApi = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_LEDGER);
    console.log("API Response:", response);
    return response.data?.groups || []; // Safely access the groups array or return an empty array if it's null
  } catch (error) {
    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
    console.error(error);
    return []; // Return empty array in case of error
  }
};