"use client";

import { useState } from "react";
import Link from "next/link";
import useForgetPassword from "../hooks/useForgetPassword";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [followUp, setFollowUp] = useState("");
  const { loading, forgetPassword } = useForgetPassword();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await forgetPassword(username, newPassword, followUp);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[22rem] md:min-w-96 mx-auto   shadow-lg bg-zinc-900  border rounded-lg border-black">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-xl font-semibold text-center text-gray-300">
          Create New Password
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
          <div>
            <label className="label">
              <span className="text-base label-text text-white">
                who is your favourite superhero?
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter followUp"
              className="w-full input input-bordered h-10"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <Link
            href="/forgetpassword"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Forget Password?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 hover:bg-sky-600 hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "change password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;
