
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