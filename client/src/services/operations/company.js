import Swal from "sweetalert2";
import { apiConnector } from "../apiConnector";
import { company } from "../apis"
import { setCompany } from "../../redux/companySlice"
import { setToken } from "../../redux/authSlice";

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
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COMPANY);
        console.log("API Response:", response); // Log entire API response

        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        result = response?.data?.companies || []; // Ensure result is an array
        return result;
    } catch (error) {
        Swal.fire({
            text: error.response?.data?.message || "Something went wrong, please try again later",
            icon: "error",
        });
        return result;
    }
};


export async function loginCompany(userName, password, navigate, dispatch) {
    Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        const response = await apiConnector("POST", COMPANY_LOGIN, {
            userName,
            password,
        });
        Swal.close();
        if (!response?.data?.success) {
            await Swal.fire({
                title: "Company Login Failed",
                text: response.data.message,
                icon: "error",
            });
            throw new Error(response.data.message);
        }

        Swal.fire({
            title: "Company Login Successfully!",
            text: `Welcome, ${response.data.company.name}!`,
            icon: "success",
        });
        dispatch(setToken(response?.data?.token));
        dispatch(setCompany(response?.data?.company));
        navigate("/company/dashboard");
    } catch (error) {
        Swal.fire({
            title: "Company Login Failed",
            text:
                error.response?.data?.message ||
                "Something went wrong, please try again later",
            icon: "error",
        });
    }
}