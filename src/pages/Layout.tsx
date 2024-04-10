"use client"
import Sidebar from '@/components/Sidebar';
import { SelectedUserProvider } from '@/context/chatProvider';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react'
import { Toaster } from "@/components/ui/toaster"

interface LayoutProps {
    children: ReactNode;
}


const Layout = ({children}: LayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    // Check if localStorage is available (only on the client side)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('token');
      if (!user) {
        router.push('/login');
      }
    }
  }, [router]);
  return (
    <SelectedUserProvider>
    <div className='w-screen h-screen p-4 box-border bg-[#d3ede6]'>
      <div className=' rounded-lg w-full h-full flex gap-x-5'>
        <Sidebar />
        {children}
        <Toaster />
      </div>
    </div>
    </SelectedUserProvider>
  )
}

export default Layout
