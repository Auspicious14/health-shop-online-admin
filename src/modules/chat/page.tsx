import React, { useEffect, useRef, useState } from "react";
import { useChatState } from "./context";
import { io, Socket } from "socket.io-client";
import { MessageComponent } from "./components/message";
import { ApFileInput, ApTextInput, Files } from "../../components";
import {
  CloseCircleFilled,
  LoadingOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { IChat, IFile, IUserMessageStore } from "./model";
import Image from "next/image";
import chatImg from "../../../public/images/user chat image.webp";
import { Upload, UploadFile } from "antd";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { fileSvc } from "../../services/file";
import { ImagePreviewComponent } from "./components/preview";

interface IProps {
  storeId: string;
  userId: string;
  user?: { id: string | null; isAdmin: boolean };
}
export const ChatPage: React.FC<IProps> = ({ storeId, userId }) => {
  const { users, unreadMessages, getUsersWhoMessageStore } = useChatState();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [searchMessage, setSearchMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChat[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);
  const [modal, setModal] = useState<{
    show: boolean;
    type?: "preview" | "showMessage";
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

    socket.emit("chats", { storeId, userId: modal?.data?._id });

    socket.on("user_store_messages", (data: IChat[]) => {
      console.log(data);
      setMessages(data);
    });

    socket.on("new_message", (message: IChat) => {
      console.log(message, "new message");
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

  const handleSendMessage = async (userId: string, message?: string) => {
    const payload = {
      message,
      storeId,
      userId,
      senderId: storeId,
      files,
    };
    if (socketRef.current) {
      if (message !== "" || files.length > 0) {
        setMessages(
          (prevMessages) =>
            [
              ...prevMessages,
              { ...payload, images: files, align: "right" },
            ] as IChat[]
        );
        socketRef.current.emit("send_message", payload);
        setMessage("");
        setFiles([]);
      } else {
        return toast.error("Invalid text");
      }
    } else {
      console.log("No socket Instance");
    }
  };

  const filterUsers = users?.filter((user, i) => {
    return user?.user?.firstName
      .toLowerCase()
      .includes(searchMessage.toLowerCase());
  });

  const handleFileUpload = async (fileList: UploadFile<any>[]) => {
    const fls: IFile[] = await Promise.all(
      fileList.map(async (f) => ({
        name: f.name,
        uri: await fileSvc.fileToBase64(f.originFileObj as any),
        type: f.type as string,
      }))
    );
    setFiles(fls);
  };

  return (
    <div className="flex h-screen border rounded-xl relative">
      {/* Inbox Section */}
      <div className="w-1/2 md:w-1/3 lg:w-1/4 shadow-sm bg-blue-400 text-gray-200 p-4 overflow-y-auto">
        <input
          name="search"
          type="text"
          placeholder="Search"
          className="flex-grow px-4 py-2 outline-none border border-gray-300 rounded-xl my-4 w-full text-gray-600"
          value={searchMessage}
          onChange={(e) => setSearchMessage(e.target.value)}
        />
        {filterUsers?.map((user) => (
          <div
            key={user._id}
            className="mb-4"
            onClick={() =>
              setModal({ show: true, type: "showMessage", data: user })
            }
          >
            <div
              className={`flex items-center justify-between p-2 cursor-pointer ${
                user?._id === modal.data?._id
                  ? "bg-gray-200 bg-opacity-40 rounded-lg inset-1"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={chatImg}
                  width={31}
                  height={31}
                  alt="user-image"
                  className="rounded-full"
                />
                <div>
                  <p className="text-base text-white">{`${user?.user?.firstName} ${user?.user?.lastName}`}</p>
                  <small className="text-gray-200">
                    {user?.lastMessage?.message}
                  </small>
                </div>
              </div>
              <div>
                {user?._id !== modal.data?._id &&
                  user?.unreadMessagesFromUser !== 0 && (
                    <p className="flex justify-center items-center m-auto rounded-full w-7 h-7 bg-blue-700 text-white">
                      {user?.unreadMessagesFromUser}
                    </p>
                  )}
                {user?.read && (
                  <>
                    <MessageOutlined className="text-blue-700" />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Section */}
      <div className="w-full md:w-2/3 lg:w-3/4 relative bg-white p-4 overflow-y-auto flex flex-col">
        {/* {messages?.length === 0 && (
          <div className="flex justify-center items-center m-auto">
            <p>Start Messaging</p>
          </div>
        )} */}

        {modal.show && modal.type == "showMessage" && (
          <>
            <div className="relative flex-1 flex flex-col mb-12">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4"
              >
                {messages.length === 0 && (
                  <div className="flex justify-center m-auto items-center">
                    No messages
                  </div>
                )}
                {messages.map((message) => (
                  <MessageComponent message={message} key={message._id} />
                ))}
              </div>

              {/* Fixed Input Area */}
              <div className="z-[500] fixed bg-transparent bottom-4 left-[36%] sm:left-[35%] md:left-[48%] lg:left-[47%] xl:left-[43%] w-[56%] sm:w-[59%] md:w-[48%] lg:w-[49%] xl:w-[54%] flex items-center gap-4">
                <Upload
                  name="avatar"
                  listType="text"
                  className="avatar-uploader"
                  showUploadList={false}
                  multiple
                  onChange={({ fileList }) => handleFileUpload(fileList)}
                  rootClassName="w-10 h-10 flex justify-center items-center cursor-pointer"
                >
                  <PlusCircleIcon fontSize={10} className="w-7 h-7" />
                </Upload>
                <input
                  name="new_message"
                  type="text"
                  placeholder="Type your message"
                  className="flex-grow px-4 py-2 outline-none border border-gray-300 rounded-full w-full"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="flex justify-center items-center bg-blue-500 text-white p-3 rounded-full"
                  onClick={() =>
                    handleSendMessage(modal.data?._id as string, message)
                  }
                >
                  <SendOutlined className="text-lg" />
                </button>
              </div>
            </div>

            {files?.length > 0 && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <ImagePreviewComponent
                  images={files}
                  onDissmiss={(img, index) =>
                    setFiles(files.filter((f, i) => i !== index))
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// relative flex-1 flex flex-col p-4 py-12
