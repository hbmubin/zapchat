import { LazyLoadImage } from "react-lazy-load-image-component";
import useFriends from "../hooks/useFriends";
import useMyInfo from "../hooks/useMyInfo";


const Users = () => {
  const {myInfo} = useMyInfo ()
  const { friendsData } = useFriends(myInfo.friends);
  console.log(friendsData)
    return (
        <div className="flex flex-col py-4">
            {
                friendsData.map((friend, idx)=>
                    <div className="flex items-center gap-2 border-b py-3 px-6 cursor-pointer border-b-neutral-800 hover:bg-[#1a0828] group duration-50" key={idx}>
                        <div className="relative">
                        <div className="size-9 rounded-full overflow-hidden">
                            <LazyLoadImage referrerPolicy="no-referrer" className="size-full object-cover" src={friend?.photoURL}/>
                        </div>
                        <div className={`${friend.status ? "bg-green-400" : "bg-neutral-400"} size-2.5 rounded-full absolute right-0 bottom-0 ring-2 group-hover:ring-[#1a0828] duration-50 ring-deepPink`}></div>
                        </div>
                        <div>{friend.name}</div>
                    </div>)
            }
        </div>
    );
};

export default Users;