import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useMyInfo = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: myInfo = '', isLoading: myInfoLoading, error: myInfoError } = useQuery({
        queryKey: ["myInfo", user?.uid],
        queryFn: async () => {
            if (!user) {
                throw new Error("User is not authenticated");
            }

            const response = await axiosSecure.get(`/my-info/${user.uid}`);
            
            if (response.status !== 200) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return response.data;
        },
        enabled: !!user, 
    });

    return { myInfo, myInfoLoading, myInfoError };
};

export default useMyInfo;