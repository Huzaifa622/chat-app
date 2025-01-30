"use client"

import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";



export const  useAuth =()=>{
    const data = useContext(AuthContext);
    console.log(data)
    return data;
}


