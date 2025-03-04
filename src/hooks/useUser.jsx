import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUser = (id) => {
    const axiosSecure = useAxiosSecure()

    const {data: userInfo, isLoading: userLoading, error: userError} = useQuery({
        queryKey: ["userInfo", id],
        queryFn: async ()=>{
            if(!id){
                throw new Error("User is not authenticated")
            }
            const response = await axiosSecure.get(`/users/${id}`)
            if(response.status !== 200){
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            return response.data
        },
        enabled: !!id

    })
    return {userInfo, userLoading, userError}
};

export default useUser;