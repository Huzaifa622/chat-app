"use client";
import { useSocket } from "@/context/socket-context";
import { api } from "@/lib/axios-instance";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const MessageRoom = () => {
  const socket = useSocket();
  const [socketId , setSocketId] = useState("")
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [user, setUser] = useState<{
    name: string;
    isOnline: string;
    id: string;
    image: string;
  }>({ name: "", isOnline: "", id: "", image: "" });
  const [loader, setLoader] = useState(false);
  const [content , setContent] = useState("")

  const fetching =  useCallback( async () => {
    setLoader(true);
    // const getRoom = await api.get(`/get-all-messages`);
    const getUser = await api.post(`/single-user`, { id: userId });
    console.log(getUser);
    setUser(getUser.data.data);
    setLoader(false);
  },[userId]);

  useEffect(() => {
    socket?.on("message", (content) => {
      // Add message to your state
      console.log("New message:", content);
    });
  
    socket?.on("typing", (senderId) => {
      if (senderId === userId) {
        setUser(prev => ({ ...prev, isOnline: "typing" }));
        // Reset to 'online' after a delay
        setTimeout(() => {
          setUser(prev => ({ ...prev, isOnline: "online" }));
        }, 2000);
      }
    });
  
    return () => {
      socket?.off("message");
      socket?.off("typing");
    };
  }, [socket, userId]);
  
  useEffect(() => {
    if (userId) {
      fetching();
    }
  }, [userId , fetching]);
  
  socket?.on("connect", () => {
  if(socket.id){
    setSocketId(socket.id)
  }
  });
    socket?.on("user-status-changed", ({ userId, isOnline }) => {
      if (user?.id == userId) {
        setUser((prev) => ({
          ...prev,
          isOnline: isOnline,
        }));
      }
    });

    // socket?.on("status" ,({msg})=>{
    //   console.log(msg)
    //   setUser((prev) => ({
    //     ...prev,
    //     isOnline: msg,
    //   }));
    // })

    // socket?.on("message" , (msg)=>{
    //   console.log(msg)
    // })

  const handleKeyDown = () =>{
   socket?.emit("typing-message",userId)
  }
 
 const handleSubmit = async(e:React.SyntheticEvent)=>{
  e.preventDefault()
  try {
    console.log(socketId)
    socket?.emit("message" , {content , socketId})
    const res = await api.post("send" , {content})
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
  }
  if(!userId){
    return <div></div>
  }
  if (loader) {
    return <div> loading....</div>;
  }
  return (
    <div className="w-[70%] bg-black text-white  relative">
      <div className="bg-gray-900 border-b flex p-2 justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={user?.image || ""}
            alt="user"
            width={200}
            height={200}
            className="w-12 h-12 rounded-full bg-cover "
          />
          <div className="transition-all ease-linear text-xs">
            <h1>{user?.name}</h1>
            <h4 className="transition-all ease-linear text-xs">
              {user?.isOnline}
            </h4>
          </div>
        </div>
      </div>
      {/* <div className=""></div> */}
      <form onSubmit={handleSubmit} className=" bg-gray-900 p-4 flex gap-4 items-center absolute bottom-0 w-full">
        <input
        onKeyDown={handleKeyDown}
        onChange={(e)=>setContent(e.target.value)}
          className="py-2 text-sm w-full bg-gray-600 outline-none rounded-lg p-2"
          placeholder="Aa..."
        />
        <button type="submit" className="bg-black w-8 h-8 flex items-center justify-center rounded-full hover:-rotate-45 transition-all ease-out cursor-pointer">
          <IoSendSharp size={20} className="" />
        </button>
      </form>
    </div>
  );
};

export default MessageRoom;
