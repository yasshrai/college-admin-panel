import React from "react";
import LogoutButton from "./Logoutbutton";
import { FaBuildingColumns } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="w-full h-[10vh] bg-gray-950 p-10 flex flex-row items-center justify-evenly">
      <div className=" flex flex-row gap-1 items-center justify-center">
        <span>
          <FaBuildingColumns className=" text-xl"></FaBuildingColumns>
        </span>
        <h1 className={`text-xl md:text-2xl`}>College Admin Panel</h1>
      </div>
      <div>
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
};

export default Navbar;
