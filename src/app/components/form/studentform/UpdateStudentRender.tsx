"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import UpdateStudentForm from "./UpdateStudentForm";

interface StudentFormDataForUpdate {
  scholarNumber: string;
}

const UpdateStudentRender = () => {
  const [submittedscholarNumber, setSubmittedscholarNumber] = useState<
    string | null
  >(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormDataForUpdate>();

  const onSubmit: SubmitHandler<StudentFormDataForUpdate> = (data) => {
    setSubmittedscholarNumber(data.scholarNumber);
    reset(); // Reset the form after submission
  };

  return (
    <>
      <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] bg-zinc-900 overflow-auto flex flex-col items-center">
        <div className="w-[80vw] md:w-[40vw] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg ">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-white">
                    scholarNumber
                  </span>
                </label>
                <input
                  {...register("scholarNumber", {
                    required: "scholarNumber is required",
                  })}
                  className="w-full input input-bordered h-10"
                  placeholder="Enter scholarNumber"
                />
                {errors.scholarNumber && (
                  <p className="text-red-500">{errors.scholarNumber.message}</p>
                )}
              </div>
              <button
                className="btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-sky-600 hover:text-white"
                type="submit"
              >
                Find Student
              </button>
            </form>
          </div>
        </div>

        {submittedscholarNumber && (
          <div className="h-[89vh] w-[99vw] md:w-[83vw] bg-zinc-900">
            <UpdateStudentForm
              key={submittedscholarNumber}
              scholarNumber={submittedscholarNumber}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateStudentRender;
