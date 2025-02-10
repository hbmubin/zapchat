import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFriends = (friends) => {
  const axiosSecure = useAxiosSecure();

  const { data: friendsData = [], isLoading: friendsLoading, error: friendsError } = useQuery({
    queryKey: ["friends", friends],
    queryFn: async () => {

      const friendPromises = friends.map((id) =>
        axiosSecure.get(`/users/${id}`) 
      );
      const responses = await Promise.all(friendPromises);

      return responses.map((response) => response.data);
    },
    enabled: friends && friends.length > 0, 
  });

  return { friendsData, friendsLoading, friendsError };
};

export default useFriends;

