"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
    formState: { errors },
  } = useForm<ProfessorFormInputs>();

  const onSubmit: SubmitHandler<ProfessorFormInputs> = (data) => {
    console.log(data);
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
                placeholder="John Doe"
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
                type="number"
                className="w-full input input-bordered h-10"
                {...register("age", { required: "Age is required" })}
                placeholder="40"
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Department
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                {...register("department", {
                  required: "Department is required",
                })}
                placeholder="Computer Science"
              />
              {errors.department && (
                <p className="text-red-500">{errors.department.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Position
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                {...register("position", { required: "Position is required" })}
                placeholder="Professor"
              />
              {errors.position && (
                <p className="text-red-500">{errors.position.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Professor ID
                </span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                {...register("professorId", {
                  required: "Professor ID is required",
                })}
                placeholder="PROF12345"
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
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                })}
                placeholder="9876543210"
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
                  required: "Email address is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email address is invalid",
                  },
                })}
                placeholder="john.doe@example.com"
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
                {...register("residenceAddress", {
                  required: "Residence address is required",
                })}
                placeholder="1234 Elm Street"
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessorForm;
