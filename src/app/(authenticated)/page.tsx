"use client"
import { SocketProvider } from "@/context/socket-context"
import ChatRoom from "./_components/chat-room"

export default function page(){
    return(
        <div>
          
            <ChatRoom />
           
        </div>
    )
}