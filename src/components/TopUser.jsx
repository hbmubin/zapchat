import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UtilitiesContext } from "../provider/UtilitiesProvider";
import { AuthContext } from "../provider/AuthProvider"
import Swal from "sweetalert2";
import userMan from '../assets/image/user-man.png'
import useMyInfo from "../hooks/useMyInfo";


const TopUser = () => {
    const [open, setOpen] = useState(false);
    const [focus, setFocus] = useState(false);
    const dropdownRef = useRef(null); 
    const { setMyProfile } = useContext(UtilitiesContext);
    const {logOut} = useContext(AuthContext)
    const {myInfo} = useMyInfo()

    const handleLogOut =()=>{
      logOut()
      .then(()=>{
        Swal.fire({
          title: "Logout successfully!",
          icon: "success",
          background: "#ede9fe",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: error.code,
          icon: 'error',
          background: "#ede9fe",
          confirmButtonColor: "#6d28d9",
        });
      });
    }

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
    return (
      <div className="bg-deepPink px-8 py-5 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div onClick={()=>setMyProfile(true)} className="flex-grow flex items-center gap-3 cursor-pointer rounded-full active:bg-[#290d3d] py-1 pl-1 active:scale-[0.98] duration-200">
            <div className="size-10 rounded-full overflow-hidden">
              <LazyLoadImage referrerPolicy="no-referrer" className="size-full object-cover object-center" src={myInfo?.photoURL || userMan} alt={myInfo?.name} />
            </div>
            <div>{myInfo?.name}</div>
          </div>
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setOpen(!open)} className="text-lightPink default-btn">
              <BsThreeDots size={20} />
            </button>
            <div              
              className={`${
                open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
              } origin-top-right absolute z-20 top-5 right-0 bg-deepPink px-4 py-2 border border-neutral-900 rounded-lg shadow-sm shadow-neutral-900 text-small duration-200 p-1 text-nowrap flex flex-col gap-2 items-start`}
            >
              <button
                onClick={()=>setMyProfile(true)}
                className="hover:text-neutral-400"
              >
                My Profile
              </button>
              <button
                onClick={handleLogOut}
                className="text-amber-600 mt-1.5 hover:text-amber-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-[#2c0f44] rounded-full py-2.5 mt-4">
          <div className={`text-small ml-4 duration-200 ${focus ? "scale-0 opacity-0" : "scale-1 opacity-100"}`}>
            <FaMagnifyingGlass />
          </div>
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`bg-transparent outline-none flex-grow placeholder:text-sm placeholder:text-neutral-500 px-4 ${focus ? "-translate-x-5 duration-200" : "translate-x-0 duration-200"}`}
            type="text"
            placeholder="Search for people"
          />
        </div>
      </div>
    );
};

export default TopUser;