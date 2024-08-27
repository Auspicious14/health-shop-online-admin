import React, { useEffect, useRef, useState } from "react";
import { useChatState } from "./context";
import { io, Socket } from "socket.io-client";
import { MessageComponent } from "./components/message";
import { ApTextInput } from "../../components";
import {
  CloseCircleFilled,
  LoadingOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { IChat, IUserMessageStore } from "./model";
import Image from "next/image";
import chatImg from "../../../public/images/user chat image.webp";

interface IProps {
  storeId: string;
  userId: string;
  user?: { id: string | null; isAdmin: boolean };
}
export const ChatPage: React.FC<IProps> = ({ storeId, userId }) => {
  const { users, getMessagesBetweenUserAndStore, getUsersWhoMessageStore } =
    useChatState();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [searchMessage, setSearchMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChat[]>([]);
  const [modal, setModal] = useState<{
    show: boolean;
    data?: IUserMessageStore;
  }>({ show: false });

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_ROUTE}`);
    socketRef.current = socket;

    const role = userId ? "user" : "store";
    const senderId = storeId;

    socket.on("connect", () => {
      console.log(socket.id, "socket connected");
      socket.emit("register_client", { senderId, role: "store" });
    });

    socket.on("connect_error", (err) => {
      socket.connect();
    });

    socket.emit("chats", { storeId, userId: modal.data?._id });

    socket.on("all_messages", (data: IChat[]) => {
      setMessages(data);
    });

    socket.on("new_message", (message: IChat) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [modal]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    getUsersWhoMessageStore(storeId);
  }, []);

  const handleSendMessage = (message: string, userId: string) => {
    const payload = {
      message,
      storeId,
      userId,
      senderId: storeId,
    };
    if (socketRef.current) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...payload, align: "right" },
      ]);
      socketRef.current.emit("send_message", payload);
      setMessage("");
    } else {
      console.log("No socket Instance");
    }
  };

  const handleSearch = (value: string) => {
    setSearchMessage(value);
    const filterUser = users.filter(
      (user, i) =>
        searchMessage.includes(user.user.firstName) ||
        searchMessage.includes(user.user.lastName)
    );
    console.log(filterUser, "filter user");
  };

  return (
    <div className="flex h-screen border rounded-xl">
      {users?.map((user) => (
        <>
          <div
            key={user._id}
            className="w-1/4 shadow-sm bg-blue-400 text-gray-200 p-4 overflow-y-auto"
          >
            <input
              name="search"
              type="text"
              placeholder="Search"
              className="flex-grow px-4 py-2 outline-none border border-gray-300 rounded-xl my-4 w-full text-gray-600"
              value={searchMessage}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div
              className="mb-4"
              onClick={() => setModal({ show: true, data: user })}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={chatImg}
                  width={31}
                  height={31}
                  alt="user-image"
                  className="rounded-full"
                />
                <div>
                  <p className="font-base">{`${user?.user?.firstName} ${user?.user?.lastName}`}</p>
                  <small className="text-gray-500">
                    {user?.user?.lastName}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {modal.show && (
            <>
              <div className="relative flex-1 flex flex-col p-4 ">
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto mb-4 space-y-4"
                >
                  {messages.length === 0 && (
                    <div className="flex justify-center my-auto items-center">
                      No messages
                    </div>
                  )}
                  {messages.map((message) => (
                    <MessageComponent message={message} key={message._id} />
                  ))}
                </div>

                <div className="absolute bottom-2 w-[90%] flex gap-4 mt-4">
                  <input
                    name="new_message"
                    type="text"
                    placeholder="Type your message"
                    className="flex-grow px-4 py-2 outline-none border border-gray-300 rounded-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="flex justify-center items-center bg-blue-500 text-white p-3 rounded-full"
                    onClick={() =>
                      handleSendMessage(message, modal.data?._id as string)
                    }
                  >
                    <SendOutlined className="text-lg" />
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ))}
    </div>
  );
};
