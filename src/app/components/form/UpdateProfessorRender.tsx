"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import UpdateProfessorForm from "./UpdateProfessorForm";

interface ProfessorFormDataForUpdate {
  professorId: string;
}

const UpdateProfessorRender = () => {
  const [submittedProfessorId, setSubmittedProfessorId] = useState<
    string | null
  >(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfessorFormDataForUpdate>();

  const onSubmit: SubmitHandler<ProfessorFormDataForUpdate> = (data) => {
    setSubmittedProfessorId(data.professorId);
    reset(); // Reset the form after submission
  };

  return (
    <>
      <div className="h-[80vh] md:h-[89vh] w-[98vw] md:w-[85vw] bg-gray-950 overflow-auto flex flex-col items-center">
        <div className="w-[80vw] md:w-[40vw] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg ">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-white">
                    Professor ID
                  </span>
                </label>
                <input
                  {...register("professorId", {
                    required: "Professor ID is required",
                  })}
                  className="w-full input input-bordered h-10"
                  placeholder="Enter Professor ID"
                />
                {errors.professorId && (
                  <p className="text-red-500">{errors.professorId.message}</p>
                )}
              </div>
              <button
                className="btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-sky-600 hover:text-white"
                type="submit"
              >
                Find Professor
              </button>
            </form>
          </div>
        </div>

        {submittedProfessorId && (
          <div className="h-[89vh] w-[80vw] bg-gray-900">
            <UpdateProfessorForm
              key={submittedProfessorId}
              professorId={submittedProfessorId}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProfessorRender;
