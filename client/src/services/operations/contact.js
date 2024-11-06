import { apiConnector } from "../apiConnector";
import { contact } from "../apis";
import Swal from "sweetalert2";

const { CONTACT } = contact

export const sendContactForm = async (formData) => {
    Swal.fire({
        title: "Loading...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
    try {
        const response = await apiConnector("POST", CONTACT, formData);
        if (response?.data) {
            Swal.fire({
                title: "Good job!",
                text: "Your message has been sent successfully!",
                icon: "success",
            });
        }
        return response;
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "Error!",
            text: "There was a problem sending your message. Please try again later.",
            icon: "error",
        });
    }
};