import { LazyLoadImage } from "react-lazy-load-image-component";

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


const Users = () => {
    return (
        <div className="flex flex-col py-4">
            {
                chats.map(chat=>
                    <div className="flex items-center gap-2 border-b py-3 px-6 cursor-pointer border-b-neutral-800 hover:bg-[#1a0828] group duration-50" key={chat.id}>
                        <div className="relative">
                        <div className="size-9 rounded-full overflow-hidden">
                            <LazyLoadImage className="size-full object-cover" src={chat.avatar}/>
                        </div>
                        <div className="bg-green-400 size-2.5 rounded-full absolute right-0 bottom-0 ring-2 group-hover:ring-[#1a0828] duration-50 ring-deepPink"></div>
                        </div>
                        <div>{chat.name}</div>
                    </div>)
            }
        </div>
    );
};

export default Users;