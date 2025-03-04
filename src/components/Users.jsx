import useMyInfo from "../hooks/useMyInfo";
import SingleActiveUser from "./SingleActiveUser";


const Users = () => {
  const {myInfo} = useMyInfo ()
    return (
        <div className="flex flex-col py-4">
            {
                myInfo.friends.map((userId, idx)=>
                    <SingleActiveUser key={idx} userId={userId} />)
            }
        </div>
    );
};

export default Users;