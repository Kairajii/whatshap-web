import axios from "axios"
import API_REQUEST from "./utils/axios.utils";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user`;


const REGISTER_USERS = async (payload: any) => {
    const url = baseUrl;
    console.log({ payload })
    const response = await API_REQUEST(url, "post", payload);
    return response
}

const LOGIN_USERS = async(payload : any)=>{
    const url =`${baseUrl}/login`;
    console.log({payload});
    const response = await API_REQUEST(url,"post",payload)
    return response;
}
const ALL_USERS = async(payload : any)=>{
    const url =`${baseUrl}?search=${payload}`;
    console.log({payload});
    const token = localStorage.getItem('token');
    const response = await API_REQUEST(url,"get",payload,token)
    return response;
}

export {
    REGISTER_USERS,
    LOGIN_USERS,
    ALL_USERS
}