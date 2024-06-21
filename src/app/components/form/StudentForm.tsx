"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useEnterStudentData from "@/app/hooks/useEnterStudentData";

type StudentFormInputs = {
  name: string;
  branch: string;
  department?: string;
  rollNumber?: string;
  scholarNumber?: string;
  enrollmentNumber?: string;
  admissionYear?: number;
  leaveUniversity?: boolean;
  passOutYear?: number;
  mobileNumber?: string;
  emailAddress?: string;
  fatherName?: string;
  motherName?: string;
  residenceAddress?: string;
  parentContectNumber?: string;
  semester?: string;
  section?: string;
  subjectinHighSchool?: string;
  regular?: boolean;
  busFacility?: boolean;
  achivements?: string;
};

const StudentForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormInputs>();
  const { loading, createStudent } = useEnterStudentData();
  const onSubmit: SubmitHandler<StudentFormInputs> = async (data) => {
    const success = await createStudent(data);
    if (success) {
      reset();
    }
  };

  return (
    <div className="h-[89vh] w-[85vw] bg-gray-900 overflow-auto ">
      <div className="w-[80vw] md:w-[40vw] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg ">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-xl font-semibold text-center text-gray-300">
            Add <span className="text-blue-500">Student</span>
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
                <span className="text-base label-text text-white">Branch</span>
              </label>
              <input
                {...register("branch", { required: "Branch is required" })}
                className="w-full input input-bordered h-10"
                placeholder="Computer Science"
              />
              {errors.branch && (
                <p className="text-red-500">{errors.branch.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Department
                </span>
              </label>
              <input
                {...register("department")}
                className="w-full input input-bordered h-10"
                placeholder="Department"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Roll Number
                </span>
              </label>
              <input
                {...register("rollNumber")}
                className="w-full input input-bordered h-10"
                placeholder="123456"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Scholar Number
                </span>
              </label>
              <input
                {...register("scholarNumber")}
                className="w-full input input-bordered h-10"
                placeholder="SCH123456"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Enrollment Number
                </span>
              </label>
              <input
                {...register("enrollmentNumber")}
                className="w-full input input-bordered h-10"
                placeholder="ENR123456"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Admission Year
                </span>
              </label>
              <input
                type="number"
                {...register("admissionYear")}
                className="w-full input input-bordered h-10"
                placeholder="2020"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Leave University
                </span>
              </label>
              <input
                type="checkbox"
                {...register("leaveUniversity")}
                className="checkbox checkbox-primary"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Pass Out Year
                </span>
              </label>
              <input
                type="number"
                {...register("passOutYear")}
                className="w-full input input-bordered h-10"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Mobile Number
                </span>
              </label>
              <input
                {...register("mobileNumber", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mobile number must be 10 digits",
                  },
                })}
                className="w-full input input-bordered h-10"
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
                {...register("emailAddress", {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email address is invalid",
                  },
                })}
                className="w-full input input-bordered h-10"
                placeholder="john.doe@example.com"
              />
              {errors.emailAddress && (
                <p className="text-red-500">{errors.emailAddress.message}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Father Name
                </span>
              </label>
              <input
                {...register("fatherName")}
                className="w-full input input-bordered h-10"
                placeholder="Father Name"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Mother Name
                </span>
              </label>
              <input
                {...register("motherName")}
                className="w-full input input-bordered h-10"
                placeholder="Mother Name"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Residence Address
                </span>
              </label>
              <input
                {...register("residenceAddress")}
                className="w-full input input-bordered h-10"
                placeholder="1234 Elm Street"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Parent Contact Number
                </span>
              </label>
              <input
                {...register("parentContectNumber")}
                className="w-full input input-bordered h-10"
                placeholder="9876543211"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Semester
                </span>
              </label>
              <input
                {...register("semester")}
                className="w-full input input-bordered h-10"
                placeholder="5th"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Section</span>
              </label>
              <input
                {...register("section")}
                className="w-full input input-bordered h-10"
                placeholder="A"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Subject in High School
                </span>
              </label>
              <input
                {...register("subjectinHighSchool")}
                className="w-full input input-bordered h-10"
                placeholder="Mathematics"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Regular</span>
              </label>
              <input
                type="checkbox"
                {...register("regular")}
                className="checkbox checkbox-primary"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Bus Facility
                </span>
              </label>
              <input
                type="checkbox"
                {...register("busFacility")}
                className="checkbox checkbox-primary"
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">
                  Achievements
                </span>
              </label>
              <input
                {...register("achivements")}
                className="w-full input input-bordered h-10"
                placeholder="Achievements"
              />
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

export default StudentForm;
