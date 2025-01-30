"use client"
import Link from 'next/link'
import { api } from '@/lib/axios-instance'
import { useAuth } from '@/context/auth-context'
import { useEffect, useState } from 'react'

export default function Header() {
  const data = useAuth()


  const handleLogout = async () => {
    try {
      const res = await api.post(`/logout`)
      if (res.status === 201) {
        localStorage.removeItem("user")
        window.location.href = "/login"
      }
    } catch (error) {
      console.log(error)
    }
  }

  // if (!isMounted) {
  //   // Return null or loading spinner during SSR/hydration
  //   return null
  // }

  return (
    <div className='bg-black py-4'>
      <div className='w-[80%] mx-auto text-white flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Chat <i>Block</i></h1>
        <div className='flex justify-between gap-5 transition-all ease-linear'>
          {data?.id ? (
            <button 
              className='rounded-sm hover:bg-white hover:text-black transition-all ease-linear text-white px-2 py-1'
              onClick={handleLogout}
            >
              LogOut
            </button>
          ) : (
            <>
              <Link 
                href="/register"
                className='rounded-sm hover:bg-white hover:text-black transition-all ease-linear text-white px-2 py-1'
              >
                Register
              </Link>
              <Link 
                href="/login"
                className='rounded-sm hover:bg-white hover:text-black transition-all ease-linear text-white px-2 py-1'
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}