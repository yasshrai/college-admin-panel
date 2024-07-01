"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useEnterProfessorData from "@/app/hooks/useEnterProfessorData";
import DropDown from "../DropDown";

type ProfessorFormInputs = {
  name: string;
  age: number;
  department: string;
  position: string;
  professorId: string;
  mobileNumber: string;
  emailAddress: string;
  residenceAddress: string;
};

const ProfessorForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfessorFormInputs>();
  const { loading, createProfessor } = useEnterProfessorData();
  const onSubmit: SubmitHandler<ProfessorFormInputs> = async (data) => {
    const success = await createProfessor(data);
    if (success) {
      reset();
    }
  };

  return (
    <div className="h-[89vh] w-[85vw] bg-gray-900 overflow-auto ">
      <div className="w-[80vw] md:w-[40vw] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-900">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-xl font-semibold text-center text-gray-300">
            Add <span className="text-blue-500">Professor</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full input input-bordered h-10"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Age</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered h-10"
                {...register("age", { required: "Age is required" })}
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>

            <DropDown
              name="department"
              label="Department"
              options={[
                "",
                "School of Computer Science",
                "School of Management",
                "School of Commerce",
                "School of Fashion",
                "School of LAW",
              ]}
              register={register}
            />

            <DropDown
              name="position"
              label="Position"
              options={[
                "",
                "assistant professor",
                "Head of Department",
                "senior professor",
              ]}
              register={register}
            />

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Professor ID
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                {...register("professorId")}
              />
              {errors.professorId && (
                <p className="text-red-500">{errors.professorId.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Mobile Number
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                {...register("mobileNumber", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                })}
              />
              {errors.mobileNumber && (
                <p className="text-red-500">{errors.mobileNumber.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Email Address
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                {...register("emailAddress", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email address is invalid",
                  },
                })}
              />
              {errors.emailAddress && (
                <p className="text-red-500">{errors.emailAddress.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Residence Address
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                {...register("residenceAddress")}
              />
              {errors.residenceAddress && (
                <p className="text-red-500">
                  {errors.residenceAddress.message}
                </p>
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
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessorForm;
