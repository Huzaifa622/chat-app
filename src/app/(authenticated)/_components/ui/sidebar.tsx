"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { api } from "@/lib/axios-instance";
import SingleUser from "./single-user";
// import { useSocket } from "@/context/socket-context";

export default function SideBar() {
  // const socket = useSocket()
  const [allUsers, setAllUsers] = useState<
    { name: string; isOnline: number; image: string; id: string }[]
  >([]);
  const fetching = useCallback(async () => {
    const res = await api.get(`/get-all-users`);
    setAllUsers(res.data.data);
  }, []);

  useEffect(() => {
    fetching();
  }, []);
 

  return (
    <div className="w-[30%] text-white overflow-hidden border-r example">
      <div className="border border-gray-300 border-b px-2 flex flex-col gap-7 py-4 bg-gray-900 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Chats</h2>
          <div>
            <BsThreeDotsVertical size={20} />
          </div>
        </div>
        <div className="relative ">
          <CiSearch className="absolute top-[20%] left-4" size={20} />
          <input
            className="bg-slate-600 px-2 py-2 pl-12 text-xs rounded-md w-full outline-none"
            placeholder="search..."
          />
        </div>
      </div>
      <div className="  h-full">
        {allUsers.map((u) => (
          <SingleUser
            key={u.id}
            name={u.name}
            image={u.image}
            id={u.id}
            // online={u.isOnline}
          />
        ))}
      </div>
    </div>
  );
}
