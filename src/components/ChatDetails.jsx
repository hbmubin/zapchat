import { useEffect, useRef } from "react";
import { BiSolidSend } from "react-icons/bi";
import { BsFillHandThumbsUpFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdAddPhotoAlternate } from "react-icons/md";

const messages = [
  {
    you: {
      text: "Hey, how are you?",
      time: "2025-01-18, Saturday, 10:15 AM",
    },
  },
  {
    he: {
      text: "I'm good, thanks! How about you?",
      time: "2025-01-18, Saturday, 10:16 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
  {
    he: {
      text: "Yes, let's meet at 3 PM.",
      time: "2025-01-18, Saturday, 10:18 AM",
    },
  },
  {
    you: {
      text: "Doing great! Are we still on for the meeting later?",
      time: "2025-01-18, Saturday, 10:17 AM",
    },
  },
];

const ChatDetails = () => {
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="flex-grow flex flex-col ">
      <div className="flex items-center bg-white px-8 py-3 shadow">
        <div className="flex-grow">
          <div className="flex w-fit items-center gap-3 active:scale-[0.997] duration-200 cursor-pointer">
            <div className="size-12 relative">
              <img className="size-full object-cover rounded-full" src="https://random.imagecdn.app/300/300" alt="" />
              <div className="absolute bottom-0 right-0 size-4 rounded-full bg-green-500 border-[3px] border-white"></div>
            </div>
            <div>
              <div className="font-semibold text-lg text-neutral-600">Hasanul Banna Mubin</div>
            </div>
          </div>
        </div>
        <button className="text-neutral-500 pr-1">
          <BsThreeDotsVertical size={26} />
        </button>
      </div>
      <div className="bg-lightPink flex-grow flex flex-col w-full justify-end overflow-hidden">
        <div className="overflow-y-auto py-5">
          {messages?.map((message, index) => (
            <div key={index} className="flex flex-col gap-1 px-8 py-3">
              <div className={`flex ${message.you ? "justify-end" : "justify-start"} w-full`}>
                <span className={`px-4 py-2.5 leading-none inline-block w-fit rounded-3xl text-white ${message.you ? "bg-mediumPink" : "bg-blue-500"}`}>
                  {message.you?.text || message.he?.text}
                </span>
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
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 5 * 1.5 * 16)}px`;
            }}
            rows={1}
            className="w-full overflow-hidden outline-none message-box border rounded-2xl bg-[#f9f8ff] text-neutral-700 placeholder:text-neutral-700 resize-none px-4 py-2 placeholder:text-sm text-sm"
            placeholder="Type a message"
            type="text"
          />
        </div>
        <div className="text-mediumPink cursor-pointer">
          <BiSolidSend size={26} />
          {/* <BsFillHandThumbsUpFill size={24} /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
