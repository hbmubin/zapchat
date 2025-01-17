import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

const TopUser = () => {
    const [open, setOpen] = useState(false);
    const [focus, setFocus] = useState(false);

    const onBlur = () => {
     window.addEventListener("click", (e) => {
        if (e.target.closest(".menu-top")) return;
        setOpen(false);
     });
    };

    return (
      <div className="bg-deepPink p-8">
        <div className="flex items-center gap-2">
          <div className="flex-grow flex items-center gap-3">
            <div className="size-10 rounded-full overflow-hidden">
              <img className="w-full" src="https://i.ibb.co.com/F3YXB6k/hasanul-Banna-Mubin.jpg" alt="" />
            </div>
            <div>Hasanul Banna Mubin</div>
          </div>
          <div className="relative menu-top">
            <button onClick={() => setOpen(!open)} className="text-lightPink default-btn">
              <BsThreeDots />
            </button>
            {open && (<div
              onBlur={onBlur}
              className="absolute z-20 top-5 right-0 bg-deepPink px-4 py-2 border border-neutral-900 rounded-lg shadow-sm shadow-neutral-900 text-small duration-200"
            >
              <button
                onClick={() => {
                  console.log("ok");
                }}
                className="hover:text-neutral-400"
              >
                Account
              </button>
              <button
                onClick={() => {
                  console.log("ok");
                }}
                className="text-amber-600 mt-1.5 hover:text-amber-500"
              >
                Logout
              </button>
            </div>)}
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
            placeholder="Search for people or group"
          />
        </div>
      </div>
    );
};

export default TopUser;