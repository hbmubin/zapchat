import axios from "axios";

export const axiosPublic = axios.create({
    baseURL : 'http://zap-chat-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;