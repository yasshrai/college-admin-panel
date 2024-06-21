"use client";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";
const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <div className=" flex flex-col items-center justify-center">
          <BiLogOut
            className="text-xl md:text-2xl text-white cursor-pointer t"
            onClick={logout}
          />
          <span className=" cursor-pointer">Logout</span>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
