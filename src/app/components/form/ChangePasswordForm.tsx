"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import useChangePassword from "@/app/hooks/useChangePassword";

type ChangePasswordInput = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

const ChangePasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>();
  const { loading, changePassword } = useChangePassword();
  const onSubmit: SubmitHandler<ChangePasswordInput> = async (data) => {
    const success = await changePassword(data);
    if (success) {
      reset();
    }
  };
  return (
    <div className="h-[80vh] md:h-[89vh] w-[99vw] md:w-[85vw] bg-gray-950 overflow-auto ">
      <div className="w-[80vw] md:w-[40vw] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg ">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-xl font-semibold text-center text-gray-300">
            Change <span className="text-blue-500">Password</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  username
                </span>
              </label>
              <input
                {...register("username", { required: "username is required" })}
                className="w-full input input-bordered h-10"
                placeholder="username"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  oldPassword
                </span>
              </label>
              <input
                {...register("oldPassword", {
                  required: "oldPassword is required",
                })}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="oldPassword"
              />
              {errors.oldPassword && (
                <p className="text-red-500">{errors.oldPassword.message}</p>
              )}
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  newPassword
                </span>
              </label>
              <input
                {...register("newPassword", {
                  required: "newPassword is required",
                })}
                className="w-full input input-bordered h-10"
                placeholder="newPassword"
                type="password"
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            <div>
              <button
                className="btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-sky-600 hover:text-white"
                type="submit"
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
    </div>
  );
};

export default ChangePasswordForm;
