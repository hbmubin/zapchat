import { useContext, useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { BsFillHandThumbsUpFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdAddPhotoAlternate, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import UserDetails from "./UserDetails";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UtilitiesContext } from "../provider/UtilitiesProvider";
import userImg from "../assets/image/user-man.png";
import useMyInfo from "../hooks/useMyInfo";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ChatDetails = () => {
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const {myInfo} =  useMyInfo()
  const [textInput , setTextInput] = useState("");
  const { sideView, setContent, myProfile, conversation } = useContext(UtilitiesContext);
  const axiosSecure = useAxiosSecure();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, []);

  const handleClickOutside = (e) => {
    // console.log(dropdownRef.current.contains(e.target))
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

const handleOnSendText = () =>{
  const message = {
    memberId: conversation.userInfo.userId,
    body: textInput,
    time: new Date().toISOString(),
    type: "text",
  }
  axiosSecure.patch(`/chat/${conversation.chat._id}`, message)
  .then(res => {
    if (res.data.modifiedCount > 0) {
      console.log("message sent");
    }
  })
  .catch(err => console.log(err));
  setTextInput("");
}
  return (
    <div className="flex-grow flex overflow-hidden">
      <div className="flex-grow flex flex-col h-full">
        <div className="flex items-center bg-white md:px-8 px-2 py-3 shadow">
          <span onClick={() => setContent("")} className="text-neutral-700 px-1 md:hidden default-btn">
            <MdOutlineKeyboardArrowLeft size={36} />
          </span>
          <div className="flex-grow">
            <div onClick={() => setUserDetails(true)} className="flex w-fit items-center gap-3 active:scale-[0.997] duration-200 cursor-pointer">
              <div className="size-12 relative">
                <LazyLoadImage className="size-full object-cover rounded-full" src={conversation?.userInfo.photoURL || userImg} alt={conversation?.userInfo.name} />
                <div className="absolute bottom-0 right-0 size-4 rounded-full bg-green-500 border-[3px] border-white"></div>
              </div>
              <div>
                <div className="font-semibold text-lg text-neutral-600">{conversation?.userInfo.name}</div>
              </div>
            </div>
          </div>
          <div ref={dropdownRef} onClick={() => setOpenDropdown(!openDropdown)} className="text-neutral-500 pr-1 relative cursor-pointer">
            <BsThreeDotsVertical size={26} />
            <div
              className={`${
                openDropdown ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
              } origin-top-right absolute z-20 top-8 right-5 bg-white px-4 py-2 border border-lightPink rounded-lg duration-200 p-1 text-nowrap flex flex-col gap-2 items-start`}
            >
              <button
                onClick={() => {
                  console.log(`Add friend clicked for chat`);
                }}
                className="hover:text-neutral-400 text-neutral-500"
              >
                User info
              </button>
              <button
                onClick={() => {
                  console.log(`Add friend clicked for Profile`);
                }}
                className="hover:text-neutral-400 text-neutral-500"
              >
                Add friend
              </button>
              <button
                onClick={() => {
                  console.log(`Delete chat clicked for chat`);
                }}
                className="text-amber-600 hover:text-amber-500"
              >
                Delete chat
              </button>
            </div>
          </div>
        </div>
        <div className="bg-lightPink flex-grow flex flex-col w-full justify-end overflow-hidden">
          <div className="overflow-y-auto py-5">
            {conversation?.chat?.messages.map((message, index) => (
              <div key={index} className="flex flex-col gap-1 px-8 py-3">
                <div className={`flex ${message.memberId === conversation.userInfo.userId ? "justify-end" : "justify-start"} w-full`}>
                  <div className="flex items-center gap-2">
                  {message.memberId == conversation.userInfo.userId && <figure className="size-6 rounded-full overflow-hidden"><LazyLoadImage className="size-full object-cover object-center" src={myInfo?.photoURL} alt="" /></figure>}
                  <span className={`px-4 py-2.5 leading-none inline-block w-fit rounded-3xl text-white ${message.memberId !== conversation.userInfo.userId ? "bg-mediumPink" : "bg-blue-500"}`}>
                    {message.body}
                  </span>
                  {message.memberId !== conversation.userInfo.userId && <figure className="size-6 rounded-full overflow-hidden"><LazyLoadImage className="size-full object-cover object-center" src={conversation?.userInfo?.photoURL} alt="" /></figure>}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white px-8 py-3 shadow">
          <div>
            <input type="file" ref={fileInputRef} className="hidden" />
            <div onClick={handleIconClick} className="text-mediumPink cursor-pointer">
              <MdAddPhotoAlternate size={26} />
            </div>
          </div>
          <div className="flex-grow flex items-center">
            <textarea
            onChange={(e) => setTextInput(e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 5 * 1.5 * 16)}px`;
              }}
              value={textInput}
              rows={1}
              className="w-full overflow-hidden outline-none message-box border rounded-2xl bg-[#f9f8ff] text-neutral-700 placeholder:text-neutral-700 resize-none px-4 py-2 placeholder:text-sm text-sm"
              placeholder="Type a message"
              type="text"
            />
          </div>
          <div className="text-mediumPink cursor-pointer">
            {textInput.length > 0 ? <span onClick={handleOnSendText}><BiSolidSend size={26} /></span> : <BsFillHandThumbsUpFill size={24} />}
          </div>
        </div>
      </div>
      <div className={`${userDetails ? "lg:w-4/12 w-screen h-screen lg:static fixed top-0 right-0 min-w-44" : "w-0"} duration-200 overflow-hidden`}>
        <UserDetails userInfo={conversation?.userInfo} setUserDetails={setUserDetails} />
      </div>
    </div>
  );
};

export default ChatDetails;
