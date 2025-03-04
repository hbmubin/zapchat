import { LazyLoadImage } from "react-lazy-load-image-component";
import useUser from "../hooks/useUser";

const SingleActiveUser = ({userId}) => {
    const {userInfo} = useUser(userId)
    return (
      <div className="flex items-center gap-2 border-b py-3 px-6 cursor-pointer border-b-neutral-800 hover:bg-[#1a0828] group duration-50" >
        <div className="relative">
          <div className="size-9 rounded-full overflow-hidden">
            <LazyLoadImage referrerPolicy="no-referrer" className="size-full object-cover" src={userInfo?.photoURL} />
          </div>
          <div className={`${userInfo?.status ? "bg-green-400" : "bg-neutral-400"} size-2.5 rounded-full absolute right-0 bottom-0 ring-2 group-hover:ring-[#1a0828] duration-50 ring-deepPink`}></div>
        </div>
        <div>{userInfo?.name}</div>
      </div>
    );
};

export default SingleActiveUser;