"use client";

import { useState } from "react";
import useLogin from "@/app/hooks/useLogin";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const { loading, login } = useLogin();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[22rem] md:min-w-96 mx-auto   shadow-lg bg-zinc-900  border rounded-lg border-black">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> college admin panel</span>
        </h1>

        <form className=" flex flex-col gap-3 pt-3" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <label className="label">
            <span className="text-base label-text text-white">Password</span>
          </label>
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 pr-10" // Add padding to the right to make space for the icon
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showpassword)}
            >
              {showpassword ? (
                <FaRegEyeSlash className="text-black dark:text-white text-xl" />
              ) : (
                <IoEyeOutline className="text-black dark:text-white text-xl" />
              )}
            </div>
          </div>

          <Link
            href="/forgetpassword"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Forget Password?
          </Link>

 
          <Link
            href="/signup"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            don't have account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 hover:bg-sky-600 hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
