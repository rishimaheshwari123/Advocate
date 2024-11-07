import Swal from "sweetalert2";
import { apiConnector } from "../apiConnector";
import { company } from "../apis"

const { CREATE_COMPANY, COMPANY_LOGIN, GET_ALL_COMPANY } = company;
export const createComapanyApi = async (formData) => {
    try {
        const response = await apiConnector("POST", CREATE_COMPANY, formData);
        Swal.fire("Success", response?.data?.message, "success");
        return response.data;
    } catch (error) {
        Swal.fire("Error", error?.response?.data?.message, "error");
        console.error(error);
        return null;
    }
};


export const getALLCompanyApi = async () => {
    const result = [];
    try {
        const response = await apiConnector("GET");
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        result = response?.data?.companies;
        return result;
    } catch (error) {
        Swal.fire({
            text:
                error.response?.data?.message ||
                "Something went wrong, please try again later",
            icon: "error",
        });
        return result;
    }
}