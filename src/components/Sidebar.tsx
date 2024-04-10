import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle";
import { FaUsers } from "react-icons/fa";
import { TbLoader3,TbMessage2Plus } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { ALL_USERS } from "@/services/user.service";
import ChatComponent from "./ChatComponent";
import { useSelectedUser } from "@/context/chatProvider";
import { LogoutDropdown } from "./LogoutDropdown";


const Sidebar = () => {
  const [search,setSearch] = useState("")
  const [allUsersDetails,setAllUserDetails] = useState([]);
  const { setSelectedUser } : any = useSelectedUser();
  const fetchAllUsers=async()=>{
    const allUsers = await ALL_USERS(search);
    if(allUsers){
      setAllUserDetails(allUsers)
      console.log("all users fetch succcessfully",allUsers);
    }
    else console.log("something went wrong on fetching all users");
  }
  // fetchAllUsers();
  useEffect(()=>{
    fetchAllUsers()
  },[search])
  const handleUserClick = (user:any) => {
    setSelectedUser(user);
  }
  return (
    <div className="w-1/4 h-full flex flex-col">
      {/* TOP BAr */}
      <div className="flex justify-between items-center  px-1 py-2 bg-[#f0faf7]">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div>
          <Toggle>
            <FaUsers className="w-6 h-6" />
          </Toggle>
          <Toggle>
            <TbLoader3 className="w-6 h-6" />
          </Toggle>
          <Toggle>
            <AiOutlineMessage className="w-6 h-6" />
          </Toggle>
          <Toggle>
            <TbMessage2Plus className="w-6 h-6" />
          </Toggle>
          <Toggle>
            <LogoutDropdown />
          </Toggle>
        </div>
      </div>
      {/* Search icon  */}
      <div className="flex justify-between items-center  px-4 py-2 bg-white border-2 border-[#f0faf7] relative">
        <CiSearch className="absolute left-5 w-5 h-5" />
        <Input
          type="text"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search or Start new chat"
          className="bg-[#f0faf7] pl-8 outline-none border-none"
        />
      </div>
      <div className="w-full h-full bg-white overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-white">
        <div className="h-[1500px] w-full px-3 py-2">
          {allUsersDetails?.map((item:any, index:any) => (
            <div className="w-full my-3 flex gap-x-5 py-2 px-3 bg-[#f0faf7] cursor-pointer" onClick={() => handleUserClick(item)}>
              <Avatar>
                <AvatarImage src={item?.pic} />
              </Avatar>
              <h1>{item?.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
