import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'https://zap-chat-server.vercel.app'
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;