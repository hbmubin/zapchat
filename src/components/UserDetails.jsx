import { FaRegHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdBlock, MdDelete, MdOutlineReport, MdPersonAdd } from "react-icons/md";

const UserDetails = ({setUserDetails}) => {
    return (
        <div className="h-full bg-lightPink text-neutral-700 overflow-y-auto">
            <div className="p-4 flex items-center gap-3 sticky top-0 bg-lightPink">
                <div className="cursor-pointer" onClick={()=>setUserDetails(false)}><IoClose size={26} /></div>
                <div className="text-lg font-medium">User info</div>
            </div>
            <div className="flex flex-col items-center py-10 border-b border-b-violet-200">
                <div className="size-36 rounded-full overflow-hidden"><img className="size-full object-cover rounded-full" src="https://random.imagecdn.app/500/300" alt="user-photo" /></div>
                <div className="mt-4 mb-1 text-neutral-800 font-medium text-xl">Hasanul Banna</div>
                <div>fhkhasnul@gmail.com</div>
            </div>
            <div className="px-4 py-2 border-b border-b-violet-200">
                <div className="text-sm mb-1">About</div>
                <div className="text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!</div>
                <div className="text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!</div>
                <div className="text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!</div>
                <div className="text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!</div>
            </div>
            {/* TODO IMAGE AND FILE AND LINK */}
            <div className="p-4 flex flex-col gap-3 font-medium">
                <div className="flex items-center gap-2 text-mediumPink"><MdPersonAdd size={22} />Add friend</div>
                <div className="flex items-center gap-2 text-mediumPink"><FaRegHeart size={22} />Add to favorites</div>
                <div className="flex items-center gap-2 text-red-600"><MdBlock size={22} />Block Hasanul Banna</div>
                <div className="flex items-center gap-2 text-red-600"><MdOutlineReport size={22} />Report Hasanul Banna</div>
                <div className="flex items-center gap-2 text-red-600"><MdDelete size={22} />Delete chat</div>
            </div>
        </div>
    );
};

export default UserDetails;