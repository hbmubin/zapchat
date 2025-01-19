import { useContext, useState } from "react";
import { UtilitiesContext } from "../provider/UtilitiesProvider";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TbEdit } from "react-icons/tb";
import { ImCheckmark } from "react-icons/im";

const MyProfile = () => {
  const { setMyProfile } = useContext(UtilitiesContext);
  const [nameEdit, setNameEdit] = useState(false);
  const [aboutEdit, setAboutEdit] = useState(false);
  return (
    <div className="bg-deepPink h-full">
      <div className="p-4 flex items-center gap-3 sticky top-0 w-full justify-between">
        <div className="text-lg font-medium">User info</div>
        <div className="cursor-pointer" onClick={() => setMyProfile(false)}>
          <IoClose size={26} />
        </div>
      </div>
      <div className="">
        <div className="py-10 px-4 border-b border-neutral-800">
          <div className="flex justify-center w-full">
            <div className="size-60 rounded-full overflow-hidden">
              <LazyLoadImage className="size-full object-cover" src="https://random.imagecdn.app/500/300" alt="Hasanul Banna Mubin" />
            </div>
          </div>
          <div className="mt-6 text-small mb-2">Your Name</div>
          <form>
            <div className={`${nameEdit && "border-b"} w-full flex items-center py-1`}>
              <input className="bg-deepPink outline-none flex-grow " readOnly={!nameEdit} type="text" defaultValue="Hasanul Banna Mubin" />
              <div className="cursor-pointer default-btn active:text-neutral-400 duration-100" onClick={() => setNameEdit(!nameEdit)}>
                {nameEdit ? <ImCheckmark size={15} /> : <TbEdit size={20} />}
              </div>
            </div>
          </form>
          <div className="mt-10 text-small mb-2">About</div>
          <form>
            <div className={`${aboutEdit && "border-b"} w-full flex items-center py-1`}>
              <textarea
                className="bg-deepPink outline-none flex-grow resize-none overflow-hidden"
                readOnly={!aboutEdit}
                type="text"
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!"
                onInput={(e) => {
                  e.target.style.height = "auto"; 
                  e.target.style.height = `${e.target.scrollHeight}px`; 
                }}
              />
              <div className="cursor-pointer default-btn active:text-neutral-400 duration-100" onClick={() => setAboutEdit(!aboutEdit)}>
                {aboutEdit ? <ImCheckmark size={15} /> : <TbEdit size={20} />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
