import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import DropDown from "../DropDown";

// Define the types for the form data
interface ProfessorFormData {
  name: string;
  age: number;
  department: string;
  position: string;
  professorId: string;
  mobileNumber: string;
  emailAddress: string;
  residenceAddress: string;
}

// Define the props type
interface UpdateProfessorFormProps {
  professorId: string;
}

const UpdateProfessorForm: React.FC<UpdateProfessorFormProps> = ({
  professorId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfessorFormData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_PORT}/api/professors/update/${professorId}`,
          {},
          { withCredentials: true }
        );
        const professor = response.data;

        // Populate the form with the fetched data
        reset(professor);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch the  professor data");
        setLoading(false);
      }
    };

    fetchProfessorData();
  }, [professorId, reset]);

  const onSubmit: SubmitHandler<ProfessorFormData> = async (data) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_PORT}/api/professors/update/${professorId}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success("Professor data updated successfully");
      reset();
    } catch (err) {
      toast.error("unable to update professor data");
    }
  };

  if (loading) {
    return (
      <div className=" w-full h-full loading loading-spinner">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className=" w-full h-full flex items-start justify-center flex-row gap-2">
        <h1 className=" text-white font-bold text-center text-3xl">{error}</h1>
        <h1 className=" text-white font-bold text-center text-3xl">
          please check the details
        </h1>
      </div>
    );
  }

  return (
    <div className="w-[80vw] md:w-[40vw] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-950">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-xl font-semibold text-center text-gray-300">
          Update <span className="text-blue-500">Professor</span>
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
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
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
              placeholder="PROF12345"
              disabled
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
              {...register("residenceAddress")}
              placeholder="1234 Elm Street"
            />
            {errors.residenceAddress && (
              <p className="text-red-500">{errors.residenceAddress.message}</p>
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
  );
};

export default UpdateProfessorForm;
