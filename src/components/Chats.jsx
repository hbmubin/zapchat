import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UtilitiesContext } from "../provider/UtilitiesProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useConversation from "../hooks/useConversation";
import { AuthContext } from "../provider/AuthProvider";
import SingleConversation from "./SingleConversation";

const Chats = () => {
  const { conversations, conversationsLoading, conversationsError } = useConversation()

  return (
    <>
      {conversations.map((chat, idx) => (
        <SingleConversation key={idx} chat={chat} />
      ))}
    </>
  );
};

export default Chats;
