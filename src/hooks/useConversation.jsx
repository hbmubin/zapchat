import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useConversation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: conversations = [],
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useQuery({
    queryKey: ["conversations", user?.uid],
    queryFn: async () => {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      const response = await axiosSecure.get(`/my-conversations/${user.uid}`);

      if (response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.data;
    },
    enabled: !!user,
  });

  return { conversations, conversationsLoading, conversationsError };
};

export default useConversation;
