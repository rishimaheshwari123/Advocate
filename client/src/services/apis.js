
const BASE_URL = process.env.REACT_APP_BASE_URL


export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/register",
}
export const contact = {
  CONTACT: BASE_URL + "/contact/create",
}

export const gallery = {
  CREATE_GALLERY: BASE_URL + "/gallery/create",
  GET_ALL_GALLERY: BASE_URL + "/gallery/get",
  DELETE_GALLERY: BASE_URL + "/gallery/delete",
  IMAGE_UPLOAD: BASE_URL + "/image/multi",
}

export const company = {
  CREATE_COMPANY: BASE_URL + "/company/create",
  GET_ALL_COMPANY: BASE_URL + "/company/getAll",
  COMPANY_LOGIN: BASE_URL + "/company/login",
  CREATE_EMPLOYEE: BASE_URL + "/company/create-employee",
  GET_EMPLOYEE: BASE_URL + "/company/get-employee",
  GET_SINGLE_EMPLOYEE: BASE_URL + "/company/get-single-employee",
  SEND_OFFER_LETTER: BASE_URL + "/company/create-offerletter"
}
