"use client"
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
}


const Layout = ({children}: LayoutProps) => {
  const route = useRouter();
  
  const user = localStorage.getItem("token");

  if (!user) {
    route.push('/login');
    return null; 
  }
  return (
    <div className='w-screen h-screen p-4 box-border bg-[#d3ede6]'>
      <div className=' rounded-lg w-full h-full flex gap-x-5'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout
