import { BiSolidMessageRounded } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

const BottomNav = ({setSideView, sideView}) => {
    return (
        <div className="bg-[#160721] grid grid-cols-3 justify-around py-4 nav-top-shadow">
            <button className="flex items-center justify-center default-btn" onClick={()=>setSideView('chats')}><div className={`${sideView == 'chats' ? 'bg-violet-200 bg-opacity-10 nav-btn-shadow rounded-full `' : 'text-neutral-600 hover:text-neutral-100'} duration-200`}><BiSolidMessageRounded size={20}/></div></button>
            <button className="flex items-center justify-center default-btn" onClick={()=>setSideView('profile')}><div className={`${sideView == 'profile' ? 'bg-violet-200 bg-opacity-10 nav-btn-shadow rounded-full `' : 'text-neutral-600 hover:text-neutral-100'} duration-200`}><FaUser size={20}/></div></button>
            <button className="flex items-center justify-center default-btn" onClick={()=>setSideView('group')}> <div className={`${sideView == 'group' ? 'bg-violet-200 bg-opacity-10 nav-btn-shadow rounded-full`' : 'text-neutral-600 hover:text-neutral-100'} duration-200`}><MdGroups size={20} /></div></button>
        </div>
    );
};

export default BottomNav;