import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UtilitiesContext } from "../provider/UtilitiesProvider";

const chats = [
  {
    id: 1,
    name: "John Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 2,
    name: "Jane Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 3,
    name: "John Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 4,
    name: "Jane Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 5,
    name: "John Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 6,
    name: "Jane Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 7,
    name: "John Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 8,
    name: "Jane Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 9,
    name: "John Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
  {
    id: 10,
    name: "Jane Doe",
    message: "Hello, How are you?",
    time: "12:30 PM",
    avatar: "https://random.imagecdn.app/300/300",
  },
];

const Chats = () => {
  const { setContent } = useContext(UtilitiesContext);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleOption = (e, chatId) => {
    e.stopPropagation(); 
    setOpenDropdown((prev) => (prev === chatId ? null : chatId));
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {chats.map((chat) => (
        <div
          onClick={() => setContent("chatDetails")}
          key={chat.id}
          className="flex group items-center border-b border-neutral-800 cursor-pointer hover:bg-[#2b0e41]"
        >
          <div className="flex-grow flex items-center pl-8 pr-3 py-4">
            <div className="flex-grow flex items-center gap-3">
              <div className="size-10 relative">
                <img
                  className="size-full object-cover rounded-full"
                  src={chat.avatar}
                  alt={`${chat.name}'s avatar`}
                />
                <div className="absolute bottom-[1px] right-[1px] size-3 rounded-full bg-green-500 border-2 border-deepPink"></div>
              </div>
              <div>
                <div className="font-medium">{chat.name}</div>
                <div className="text-sm">{chat.message}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-small">{chat.time}</div>
              <div className="text-xs bg-pink-400 size-4 inline-flex justify-center items-center p-1 leading-none rounded-full">
                1
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={(e) => handleOption(e, chat.id)}
              className="text-neutral-500 group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none pr-1"
              aria-label="More options"
            >
              <BsThreeDotsVertical size={22} />
            </button>

            {openDropdown === chat.id && (
              <div ref={dropdownRef} className="absolute z-20 top-5 right-0 bg-deepPink px-4 py-2 border border-neutral-900 rounded-lg shadow-sm shadow-neutral-900 text-small duration-200 p-1 text-nowrap flex flex-col gap-2 items-start">
                <button
                  onClick={() => {
                    console.log(`Add friend clicked for chat ${chat.id}`);
                  }}
                  className="hover:text-neutral-400"
                >
                  Add friend
                </button>
                <button
                  onClick={() => {
                    console.log(`Delete chat clicked for chat ${chat.id}`);
                  }}
                  className="text-amber-600 hover:text-amber-500"
                >
                  Delete chat
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Chats;
