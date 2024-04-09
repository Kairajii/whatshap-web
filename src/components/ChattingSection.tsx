"use client"

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import ChatComponent from './ChatComponent'
import { useSelectedUser } from '@/context/chatProvider'

const ChattingSection = () => {
  const [userName,setUserName] = useState('')
  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      const userInfo = JSON.parse(user);
      setUserName(userInfo.name);
      console.log("userInfo", userInfo);
    }
  }, []);
  
  const { selectedUser }:any = useSelectedUser();
  if (!selectedUser) return null;
  return (
    <div className='w-[90%] h-full box-border bg-white flex flex-col'>
      <div className='w-full bg-[#f0faf7] p-4 flex justify-between items-center'>
      <Avatar>
          <AvatarImage src="https://github.com/shadcn.png"  />
        </Avatar>
        <h1 className='text-black text-xl'>{userName}</h1>
      </div>
      <ChatComponent user={selectedUser}/>
    </div>
  )
}

export default ChattingSection
