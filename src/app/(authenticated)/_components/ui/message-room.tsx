"use client";
import { useSocket } from "@/context/socket-context";
import { api } from "@/lib/axios-instance";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const MessageRoom = () => {
  const socket = useSocket();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [user, setUser] = useState<{
    name: string;
    isOnline: number;
    id: string;
    image: string;
  }>({ name: "", isOnline: 0, id: "", image: "" });
  const [loader, setLoader] = useState(false);

  const fetching = async () => {
    setLoader(true);
    const getRoom = await api.get(`/get-all-messages`);
    const getUser = await api.post(`/single-user`, { id: userId });
    console.log(getUser);
    setUser(getUser.data.data);
    setLoader(false);
  };

  useEffect(() => {
    if (userId) {
      fetching();
    }
  }, [userId]);

  useEffect(() => {
    socket?.on("user-status-changed", ({ userId, isOnline }) => {
      if (user?.id == userId) {
        setUser((prev) => ({
          ...prev,
          isOnline: isOnline,
        }));
      }
    });

    return () => {
      socket?.off("user-status-changed");
    };
  }, [socket]);
  console.log(user);
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
              {user?.isOnline == 1 ? "Online" : ""}
            </h4>
          </div>
        </div>
      </div>
      {/* <div className=""></div> */}
      <div className=" bg-gray-900 p-4 flex gap-4 items-center absolute bottom-0 w-full">
        <input
          className="py-2 text-sm w-full bg-gray-600 outline-none rounded-lg p-2"
          placeholder="Aa..."
        />
        <div className="bg-black w-8 h-8 flex items-center justify-center rounded-full hover:-rotate-45 transition-all ease-out cursor-pointer">
          <IoSendSharp size={20} className="" />
        </div>
      </div>
    </div>
  );
};

export default MessageRoom;
