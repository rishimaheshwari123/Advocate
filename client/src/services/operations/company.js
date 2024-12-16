import Swal from "sweetalert2";
import { apiConnector } from "../apiConnector";
import { company } from "../apis";
import { setCompany } from "../../redux/companySlice";
import { setToken } from "../../redux/authSlice";

const {
  CREATE_COMPANY,
  COMPANY_LOGIN,
  GET_ALL_COMPANY,
  CREATE_EMPLOYEE,
  GET_EMPLOYEE,
  GET_SINGLE_EMPLOYEE,
  SEND_OFFER_LETTER,
  ATTENDANCE,
  CREATE_LEAD_API,
  FORGOT_PASSWORD_API
} = company;


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


export const updatePassword = async (email, newPassword) => {
  Swal.fire({
    title: "Loading",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    const response = await apiConnector("PUT", `${FORGOT_PASSWORD_API}`, {
      email,
      newPassword,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    Swal.fire({
      title: response?.data?.message,
      text: response?.data?.message,
      icon: "success",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Failed to update the password. Please try again.",
      icon: "error",
    });
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

    result = response?.data?.companyModeles || []; // Ensure result is an array
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

export const createEmployeeApi = async (data) => {
  try {
    Swal.fire({
      title: "Please wait...",
      text: "Creating employee...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await apiConnector("POST", CREATE_EMPLOYEE, data);

    Swal.close();

    Swal.fire("Success", response?.data?.message, "success");
    return response.data?.success;
  } catch (error) {
    Swal.close();

    Swal.fire(
      "Error",
      error?.response?.data?.message || "Something went wrong",
      "error"
    );
    console.error(error);
    return null;
  }
};

export const getALLEmployeeApi = async (companyId) => {
  let result = [];
  try {
    const response = await apiConnector("GET", `${GET_EMPLOYEE}/${companyId}`);
    console.log("API Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    result = response?.data?.employees || [];
    return result;
  } catch (error) {
    console.log(error);
    Swal.fire({
      text:
        error.response?.data?.message ||
        "Something went wrong, please try again later",
      icon: "error",
    });
    return result;
  }
};
export const getSingleEmployeeApi = async (id) => {
  let result = [];
  try {
    const response = await apiConnector("GET", `${GET_SINGLE_EMPLOYEE}/${id}`);
    console.log("API Response:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    result = response?.data?.employee || [];
    return result;
  } catch (error) {
    console.log(error);
    Swal.fire({
      text:
        error.response?.data?.message ||
        "Something went wrong, please try again later",
      icon: "error",
    });
    return result;
  }
};

export const sendOfferLetterApi = async (data) => {
  // Show loading alert
  Swal.fire({
    title: "Loading...",
    text: "Please wait while we process your request.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Make the API call
    const response = await apiConnector("POST", SEND_OFFER_LETTER, data);

    // Check if the response is successful and contains expected data
    if (response?.data?.success) {
      Swal.fire({
        title: "Good job!",
        text: "Your message has been sent successfully!",
        icon: "success",
      });
      return true; // Indicates the success of the operation
    } else {
      // Handle case where success flag is not set or data is missing
      throw new Error("Unexpected response data");
    }
  } catch (error) {
    console.log(error); // Log the error for debugging

    // Show error message
    Swal.fire({
      title: "Error!",
      text:
        error?.response?.data?.message ||
        "There was a problem sending your message. Please try again later.",
      icon: "error",
    });

    return false; // Indicates failure
  }
};

export const attendanceApi = async (formData, id) => {
  try {
    const response = await apiConnector(
      "POST",
      `${ATTENDANCE}/${id}`,
      formData
    );
    Swal.fire("Success", response?.data?.message, "success");
    return response.data;
  } catch (error) {
    Swal.fire("Error", error?.response?.data?.message, "error");
    console.error(error);
    return null;
  }
};



export const createLeadsForCompony = async (formData) => {
  try {
    const response = await apiConnector("POST", CREATE_LEAD_API, formData);
    Swal.fire("Success", response?.data?.message, "success");
    return response.data;
  } catch (error) {
    Swal.fire("Error", error?.response?.data?.message, "error");
    console.error(error);
    return null;
  }
};