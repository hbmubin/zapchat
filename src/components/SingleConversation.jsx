import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UtilitiesContext } from "../provider/UtilitiesProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../provider/AuthProvider";
import useUser from "../hooks/useUser";
import useImg from "../assets/image/user-man.png"
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

const SingleConversation = ({chat}) => {
    const { setContent, setConversation } = useContext(UtilitiesContext);
    const {user} = useContext(AuthContext)
    const otherMember = chat.members.find(member => member !== user.uid);
    const { userInfo} = useUser(otherMember);
    const lastMessage = chat?.messages[chat?.messages.length - 1]?.body;


    return (
      <div className="flex group items-center border-b border-neutral-800 cursor-pointer hover:bg-[#2b0e41] pr-2">
        <div onClick={() => {
          setContent("chatDetails")
          setConversation({chat, userInfo})
          }} className="flex-grow flex items-center pl-8 pr-3 py-4">
          <div className="flex-grow flex items-center gap-3">
            <div className="size-10 relative">
              <LazyLoadImage referrerPolicy="no-referrer" className="size-full object-cover rounded-full" src={userInfo?.photoURL || useImg} alt={`${userInfo?.photoURL}'s avatar`} />
              <div className="absolute bottom-[1px] right-[1px] size-3 rounded-full bg-green-500 border-2 border-deepPink"></div>
            </div>
            <div>
              <div className="font-medium">{userInfo?.name}</div>
              <div className="text-sm">{lastMessage}</div>
            </div>
          </div>
        </div>
        <Menu placement="bottom-end" className="">
          <MenuHandler>
            <button className="text-neutral-500 group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none pr-1 default-btn" aria-label="More options">
              <BsThreeDotsVertical size={22} />
            </button>
          </MenuHandler>
          <MenuList className="bg-deepPink p-0 min-w-max border  border-neutral-800 rounded-md shadow shadow-neutral-900 text-small duration-200 text-nowrap flex flex-col items-start`">
            <MenuItem
              onClick={() => {
                console.log(`Add friend clicked for chat ${chat.id}`);
              }}
              className="hover:text-neutral-400 py-1 duration-100"
            >
              Add friend
            </MenuItem>
            <MenuItem  className="text-amber-600 hover:text-amber-500 py-1 duration-100" onClick={() => {
                  console.log(`Delete chat clicked for chat ${chat.id}`);
                }}>
                Delete chat
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
};

export default SingleConversation;