"use client"
import { useEffect} from "react";
// import { useSearchParams } from "next/navigation";
import SideBar from "./ui/sidebar";
import MessageRoom from "./ui/message-room";

import { useSocket } from "@/context/socket-context";

// import { useSocket } from "@/context/socket-context";

// interface UserType {
//   id: string | number;
//   // Add other user properties if needed
// }

export default function ChatRoom() {
    // console.log(data)
    const socket = useSocket()
  

  // const { data } = useAuth();
  // const [user, setUser] = useState<UserType | null>(null);
  
  // // Fix 1: Properly type the user state
  // // Fix 2: Initialize with null instead of undefined

  // useEffect(() => {
  //   // Fix 3: Correct typeof check with 'undefined' string
  //   if (typeof window !== 'undefined') {
  //     const userData = localStorage.getItem("user");
  //     console.log('Raw user data from localStorage:', userData);

  //     if (userData) {
  //       try {
  //         // Fix 4: Use JSON.parse instead of JSON.stringify
  //         const parsedUser = JSON.parse(userData);
  //         console.log('Parsed user:', parsedUser);
  //         setUser(parsedUser);
  //       } catch (error) {
  //         console.error('Error parsing user data:', error);
  //         setUser(null);
  //       }
  //     } else {
  //       console.warn('No user data found in localStorage');
  //       setUser(null);
  //     }
  //   }
  // }, []); // Empty dependency array = runs once on mount

  // console.log('User state:', user);
useEffect(()=>{
socket?.connect()
},[])
  return (
    <div className="w-[90%] m-auto bg-black py-2">
      <div className="border-gray-400 border rounded-sm flex h-[90vh] relative">
        <SideBar />
        {/* Fix 5: Add null check and proper type conversion */}
        <MessageRoom  />
      </div>
    </div>
    // <div>asasd</div>
  );
}