import { useContext, useEffect, useRef, useState } from "react";
import { UtilitiesContext } from "../provider/UtilitiesProvider";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TbEdit } from "react-icons/tb";
import { ImCheckmark } from "react-icons/im";
import { MdDelete, MdLockReset } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { setMyProfile } = useContext(UtilitiesContext);
  const {logOut} = useContext(AuthContext)
  const [nameEdit, setNameEdit] = useState(false);
  const [aboutEdit, setAboutEdit] = useState(false);
  const textAreaRef = useRef();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleLogOut =()=>{
        logOut()
        .then(()=>{
          Swal.fire({
                    title: "Logout successfully!",
                    icon: "success",
                  });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: error.code,
            icon: 'error',
          });
        });
      }

  return (
    <div className="bg-deepPink h-full overflow-hidden">
      <div className="p-4 flex items-center gap-3 bg-deepPink sticky top-0 w-full justify-between">
        <div className="text-lg font-medium">User info</div>
        <div className="cursor-pointer default-btn" onClick={() => setMyProfile(false)}>
          <IoClose size={26} />
        </div>
      </div>
      <div className="overflow-y-auto myProfile-des h-[calc(100%-64px)]">
        <div className="py-10 px-4 border-b border-neutral-800">
          <div className="flex justify-center w-full">
            <div className="size-52 rounded-full overflow-hidden">
              <LazyLoadImage className="size-full object-cover" src="https://random.imagecdn.app/500/300" alt="Hasanul Banna Mubin" />
            </div>
          </div>
          <div className="mt-6 text-small mb-2">Your Name</div>
          <form>
            <div className={`${nameEdit && "border-b"} w-full flex gap-1 py-1`}>
              <input className="bg-deepPink outline-none flex-grow " readOnly={!nameEdit} type="text" defaultValue="Hasanul Banna Mubin" />
              <div className="cursor-pointer default-btn active:text-neutral-400 duration-100" onClick={() => setNameEdit(!nameEdit)}>
                {nameEdit ? <ImCheckmark size={15} /> : <TbEdit size={20} />}
              </div>
            </div>
          </form>
          <div className="mt-10 text-small mb-2">About</div>
          <form>
            <div className={`${aboutEdit && "border-b"} w-full flex gap-1 py-1`}>
              <textarea
                className="bg-deepPink outline-none flex-grow resize-none overflow-hidden"
                readOnly={!aboutEdit}
                type="text"
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                rows={1}
                ref={textAreaRef}
              />
              <div className="cursor-pointer default-btn active:text-neutral-400 duration-100" onClick={() => setAboutEdit(!aboutEdit)}>
                {aboutEdit ? <ImCheckmark size={15} /> : <TbEdit size={20} />}
              </div>
            </div>
          </form>
        </div>
        <div className="py-10 px-4 flex flex-col gap-2">
          <div className="text-amber-500 flex items-center gap-2 cursor-pointer">
            <MdLockReset size={20} />
            Reset password
          </div>
          <div onClick={handleLogOut} className="text-amber-500 flex items-center gap-2 cursor-pointer">
            <CgLogOut size={20} />
            Log out
          </div>
          <div className="text-red-500 flex items-center gap-2 cursor-pointer"><MdDelete size={20} />Delete account</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
