import React, { useEffect, useState } from 'react';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatComponent = ({ user }:any) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userInfo:any = localStorage.getItem('userInfo')
  const fromUser = JSON.parse(userInfo)

  useEffect(() => {
    socket.emit('join', fromUser._id);
  
    socket.on('message', (message) => {
      console.log('Received message:', message);
      setMessages([...messages, message] as any);
    });
  
    return () => {
      socket.off('message');
    };
  }, [messages]);
  
console.log("fromUser",fromUser._id)
console.log("toUser",user._id)
const sendMessage = () => {
    socket.emit('message', {
      from: fromUser._id,
      to: user._id,
      message: newMessage,
    });
  
    setNewMessage('');
  };

  return (
    <div className='w-[95%] p-4 h-full mx-auto flex flex-col'>
      {/* User Details */}
      <div className='flex gap-x-5 py-2 px-3 bg-[#f0faf7] items-center'>
        <Avatar>
          <AvatarImage src={user?.pic} />
        </Avatar>
        <h1>{user.name}</h1>
      </div>

      {/* Chat History */}
      <div className='flex flex-col flex-grow overflow-y-auto bg-slate-100'>
        {messages.map((message: any, index) => (
          <div
            key={index}
            className={`p-2 text-center w-1/2 bg-gray-300 px-3 py-1 my-2 mx-auto`}
          >
            <p>{message.message}</p>
          </div>
        ))}
      </div>



      {/* Message Input */}
      <div className='flex items-center justify-between px-3 py-2 bg-slate-200'>
        <input
          type='text'
          placeholder='Type a message...'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='flex-grow outline-none bg-transparent mr-2'
        />
        <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
