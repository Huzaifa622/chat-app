import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { AuthProvider } from "@/context/auth-context";
export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat app using socket and prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased overflow-hidden`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
