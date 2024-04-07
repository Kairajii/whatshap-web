import axios from "axios";



const API_REQUEST = async (url: any, method: any, data: any = null, authString: any = null) => {
    
    const response: any = await axios({
        method,
        url,
        data,
        headers: authString ? { 'Authorization': `Bearer ${authString}` } : {},
        timeout: 10000
    })
        .then((res:any) => res.data)
        .catch((error:any) => {
            const errMessage = error.message;
            console.log({ error })
        })

    if (response?.success) return response?.data;
    return response?.message;
}

export default API_REQUEST;
