import Swal from "sweetalert2";
import { apiConnector } from "../apiConnector";
import { group } from "../apis";


const {
  CREATE_GROUP,
  GET_ALL_GROUP,
  GET_SUBGROUP_BY_ID
} = group;

export const createGroupApi = async (formData) => {
  try {
    const response = await apiConnector("POST", CREATE_GROUP, formData);
    Swal.fire("Success", response?.data?.message, "success");
    return response.data;
  } catch (error) {
    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
    console.error(error);
    return null;
  }
};

export const getAllGroupsApi = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_GROUP);
    console.log("API Response:", response);
    return response.data?.groups || []; // Safely access the groups array or return an empty array if it's null
  } catch (error) {
    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
    console.error(error);
    return []; // Return empty array in case of error
  }
};


export const getSubGroupsByIdApi = async (groupId) => {
  try {
    const response = await apiConnector("GET", `${GET_SUBGROUP_BY_ID}/${groupId}`);
    return response.data.subGroups; // Return subgroups data
  } catch (error) {
    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
    console.error(error);
    return null;
  }
};