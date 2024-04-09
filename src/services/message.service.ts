import axios from "axios"
import API_REQUEST from "./utils/axios.utils";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/message`;


const SEND_MESSAGES = async (payload: any) => {
    const url = baseUrl;
    console.log({ payload })
    const token = localStorage.getItem('token');
    const response = await API_REQUEST(url, "post", payload,token);
    return response
}
const GET_ALL_MESSAGES = async (payload: any) => {
    const url = baseUrl;
    console.log({ payload })
    const token = localStorage.getItem('token');
    const response = await API_REQUEST(url, "get", payload,token);
    return response
}
export {
    SEND_MESSAGES,
    GET_ALL_MESSAGES
}