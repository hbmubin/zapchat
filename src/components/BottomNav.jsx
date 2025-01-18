import { useContext } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { UtilitiesContext } from "../provider/UtilitiesProvider";

const BottomNav = () => {
    const {sideView, setSideView} = useContext(UtilitiesContext);
    return (
        <div className="bg-[#160721] grid grid-cols-3 justify-around py-4 nav-top-shadow">
            <button className="flex items-center justify-center default-btn" onClick={()=>setSideView('chats')}><div className={`${sideView == 'chats' ? 'bg-violet-200 bg-opacity-10 nav-btn-shadow rounded-full p-1`' : 'text-neutral-600 hover:text-neutral-100'} duration-200`}><BiSolidMessageRounded size={20}/></div></button>
            <button className="flex items-center justify-center default-btn" onClick={()=>setSideView('users')}><div className={`${sideView == 'users' ? 'bg-violet-200 bg-opacity-10 nav-btn-shadow rounded-full p-1`' : 'text-neutral-600 hover:text-neutral-100'} duration-200`}><FaUser size={20}/></div></button>
            <button className="flex items-center justify-center default-btn" onClick={()=>setSideView('groups')}> <div className={`${sideView == 'groups' ? 'bg-violet-200 bg-opacity-10 nav-btn-shadow rounded-full p-1`' : 'text-neutral-600 hover:text-neutral-100'} duration-200`}><MdGroups size={20} /></div></button>
        </div>
    );
};

export default BottomNav;