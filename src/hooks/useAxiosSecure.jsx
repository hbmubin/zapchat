import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: 'http://zap-chat-server.vercel.app'
})
const useAxiosSecure = () => {

    const { logOut } = useContext(AuthContext)

    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('access-token')
        // console.log(token)
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

       axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, async (error)=> {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            await  logOut()
        }

        return Promise.reject(error);
      });
    return axiosSecure
};

export default useAxiosSecure;