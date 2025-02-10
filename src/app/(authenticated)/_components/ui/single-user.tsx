import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SingleUser({
  name,
  image,
  id,
  // online,
}: {
  name: string;
  image: string;
  id: string;
  // online: number;
}) {

  
  // console.log(online);

  return (
    <Link
      href={`/?id=${id}`}
      className="cursor-pointer px-4 py-2 flex items-center gap-4 group hover:bg-white m-2 rounded-md transition-all ease-linear"
    >
      <div className="relative">
        <Image
          src={image}
          alt="user"
          width={200}
          height={200}
          className="w-12 h-12 rounded-full bg-contain"
        />
       
      </div>
      <div>
        <h1 className="group-hover:text-black">{name}</h1>
        <h4 className="text-xs group-hover:text-black text-gray-400">hello</h4>
      </div>
    </Link>
  );
}
