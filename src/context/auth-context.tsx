"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  // id: any;
 
    name: string | null;
    id: number|null;
    token: string|null;
    email: string|null;
    image: string|null;
  
}

const AuthContext = createContext<AuthContextType>({
  name:null,
  id:null,
  token:null,
  image:null,
  email:null
}); 

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AuthContextType>({
    name:null,
    id:null,
    token:null,
    image:null,
    email:null
  });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user')!)
    if(user){
      setData(user)
    }
  }, []);
  
 
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export  const useAuth = () =>  {
  const data = useContext(AuthContext);
  if (data === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

//  if(data == null) return console.log("data not loaded")

  return data; // Can be null if not authenticated
};