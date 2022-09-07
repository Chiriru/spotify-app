import axios from "axios";
import { RequestOptions } from "./models/request.options";

const DEFAULT_CONTENT_TYPE = "application/json";

const getAxiosOptions = ({ contentType = DEFAULT_CONTENT_TYPE, tokenType = "Bearer", token, params }: RequestOptions) => {
  const headers ={
    "Content-Type": contentType,
    // Basically, if there is no token, dont even set the Authorization key, that way axios wont send an empty
    // Authorization Header. Might be useless, might not be useless
    ...(token ? {"Authorization": `${tokenType} ${token}`} : {})
  }

  return { headers, params }
}
export const getRequest = <T>(url: string, opts: RequestOptions) => {

  return axios.get<T>(url, getAxiosOptions(opts)).then(response => response.data)
}
export const postRequest = <T>(url: string, data: any, opts: RequestOptions) => {
  
  return axios.post<T>(url, data, getAxiosOptions(opts)).then(response => response.data);
}
export const putRequest = <T>(url: string, data: any, opts: RequestOptions) => {

  return axios.put<T>(url, data, getAxiosOptions(opts)).then(response => response.data);
}
export const deleteRequest = <T>(url: string, opts: RequestOptions) => {

  return axios.delete<T>(url, getAxiosOptions(opts)).then(response => response.data);
}

