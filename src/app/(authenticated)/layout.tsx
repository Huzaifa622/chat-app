import { AuthProvider } from "@/context/auth-context";
import { SocketProvider } from "@/context/socket-context";

export default function layout({ children }: { children: React.ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>;
}
