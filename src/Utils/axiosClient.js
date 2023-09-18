import axios from 'axios'
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStoregeManager'
// import store from '../redux/store';
// import { setLoading, showToast } from "../redux/slices/appConfigSlice";

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true
})

axiosClient.interceptors.request.use(
    (request) =>{
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${accessToken}`;

        return request
    }
)

axiosClient.interceptors.response.use(
    async (response) =>{
        const data = response.data;
        if(data.status === 'ok'){
            return data
        }

        const orignalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.massage;

        // if(statusCode === 401 && orignalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`){
        //     removeItem(KEY_ACCESS_TOKEN)
        //     window.location.replace('./login', '_self');
        //     return Promise.reject(error)
        // }
      

        if(statusCode === 401 && !orignalRequest._retry){
            orignalRequest._retry = true;

            const response = await axios.create({
                withCredentials: true,
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
            console.log('respons from backend' , response);

            if(response.data.status === "ok"){
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)
                orignalRequest.headers['Authorization'] = `Bearer ${response.data.result.accessToken}`

                return axios(orignalRequest)
            }else{
                removeItem(KEY_ACCESS_TOKEN)
                window.location.replace('./login', '_self');
                return Promise.reject(error)
            }
            // return axios(orignalRequest)
        }

        return Promise.reject(error)
    }
)