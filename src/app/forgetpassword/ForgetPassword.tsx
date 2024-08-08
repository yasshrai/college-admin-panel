"use client";

import { useState } from "react";
import Link from "next/link";
import useForgetPassword from "../hooks/useForgetPassword";
import toast from "react-hot-toast";

const validatePassword = (newPassword: string, confirmPassword: string) => {
  if (newPassword.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long",
    };
  }
  if (newPassword !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }
  return { success: true, error: "" };
};

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, forgetPassword } = useForgetPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = validatePassword(newPassword, confirmPassword);
    if (!validationResult.success) {
      toast.error(validationResult.error);
      return;
    }
    // Continue with password reset logic (calling forgetPassword)
    await forgetPassword(username, newPassword, followUp);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-[22rem] md:min-w-96 mx-auto shadow-lg bg-zinc-900 border rounded-lg border-black">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-xl font-semibold text-center text-gray-300">
          Create New Password
          <span className="text-blue-500"> college admin panel</span>
        </h1>

        <form className="flex flex-col gap-3 pt-3" onSubmit={handleSubmit}>
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
                Who is your favorite superhero?
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter follow-up"
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
          <div>
            <label className="label">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Link
            href="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Want to go to the login page?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 hover:bg-sky-600 hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
