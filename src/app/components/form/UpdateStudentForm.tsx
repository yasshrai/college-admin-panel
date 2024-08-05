import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import DropDown from "../DropDown";

// Define the types for the form data
interface StudentFormInputs {
  name: string;
  branch: string;
  department?: string;
  rollNumber?: string;
  scholarNumber: string;
  enrollmentNumber?: string;
  admissionYear?: number;
  leaveUniversity?: boolean;
  passOutYear?: number;
  mobileNumber?: string;
  emailAddress?: string;
  fatherName?: string;
  motherName?: string;
  residenceAddress?: string;
  parentContactNumber?: string;
  semester?: string;
  section?: string;
  subjectinHighSchool?: string;
  regular?: boolean;
  busFacility?: boolean;
  achievements?: string;
}

// Define the props type
interface UpdateStudentFormProps {
  scholarNumber: string;
}

const UpdateStudentForm: React.FC<UpdateStudentFormProps> = ({
  scholarNumber,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StudentFormInputs>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_PORT}/api/students/update/${scholarNumber}`,
          {},
          {
            withCredentials: true,
          }
        );
        const student = response.data;

        // Populate the form with the fetched data
        reset(student);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch the student data ");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [scholarNumber, reset]);

  const onSubmit: SubmitHandler<StudentFormInputs> = async (data) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_PORT}/api/students/update/${scholarNumber}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success("Student data updated successfully");
    } catch (err) {
      toast.error("Failed to update student");
    }
  };

  if (loading) {
    return (
      <div className=" w-full h-full loading loading-spinner">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className=" w-full h-full flex items-start justify-center  gap-2">
        <h1 className=" text-white font-bold text-center text-3xl">{error}</h1>
        <h1 className=" text-white font-bold text-center text-3xl">
          please check the details
        </h1>
      </div>
    );
  }

  return (
    <div className="w-[99vw] md:w-[40vw] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-zinc-900">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-xl font-semibold text-center text-gray-300">
          Update <span className="text-blue-500">Student</span>
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

          <DropDown
            name="branch"
            label="Branch"
            options={[
              "",
              "BCA",
              "BSC",
              "BBA",
              "BCOM",
              "BA",
              "MCA",
              "BTech",
              "MBA",
            ]}
            register={register}
          />

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

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Roll Number
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              {...register("rollNumber")}
              placeholder="12345"
            />
            {errors.rollNumber && (
              <p className="text-red-500">{errors.rollNumber.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Scholar Number
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              {...register("scholarNumber", {
                required: "Scholar Number is required",
              })}
              disabled
            />
            {errors.scholarNumber && (
              <p className="text-red-500">{errors.scholarNumber.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Enrollment Number
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              {...register("enrollmentNumber")}
            />
            {errors.enrollmentNumber && (
              <p className="text-red-500">{errors.enrollmentNumber.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Admission Year
              </span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              {...register("admissionYear")}
            />
            {errors.admissionYear && (
              <p className="text-red-500">{errors.admissionYear.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Leave University
              </span>
            </label>
            <input
              type="checkbox"
              className=" checkbox checkbox-primary"
              {...register("leaveUniversity")}
            />
            {errors.leaveUniversity && (
              <p className="text-red-500">{errors.leaveUniversity.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Pass Out Year
              </span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              {...register("passOutYear")}
            />
            {errors.passOutYear && (
              <p className="text-red-500">{errors.passOutYear.message}</p>
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
                Father Name
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              {...register("fatherName")}
            />
            {errors.fatherName && (
              <p className="text-red-500">{errors.fatherName.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Mother Name
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              {...register("motherName")}
            />
            {errors.motherName && (
              <p className="text-red-500">{errors.motherName.message}</p>
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
              <p className="text-red-500">{errors.residenceAddress.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Parent Contact Number
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              {...register("parentContactNumber", {
                pattern: {
                  value: /^\d{10}$/,
                  message: "Parent contact number must be 10 digits",
                },
              })}
            />
            {errors.parentContactNumber && (
              <p className="text-red-500">
                {errors.parentContactNumber.message}
              </p>
            )}
          </div>

          <DropDown
            name="semester"
            label="Semester"
            options={[
              "",
              "1st",
              "2nd",
              "3rd",
              "4th",
              "5th",
              "6th",
              "7th",
              "8th",
            ]}
            register={register}
          />

          <DropDown
            name="section"
            label="Section"
            options={["", "A", "B", "C", "D", "E", "F", "G", "h"]}
            register={register}
          />

          <DropDown
            name="subjectinHighSchool"
            label="Subject in High School"
            options={[
              "",
              "Commerce with CS",
              "Commerce with math",
              "PCM",
              "PCB",
              "PCBM",
            ]}
            register={register}
          />

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Regular</span>
            </label>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              {...register("regular")}
            />
            {errors.regular && (
              <p className="text-red-500">{errors.regular.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Bus Facility
              </span>
            </label>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              {...register("busFacility")}
            />
            {errors.busFacility && (
              <p className="text-red-500">{errors.busFacility.message}</p>
            )}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Achievements
              </span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              {...register("achievements")}
            />
            {errors.achievements && (
              <p className="text-red-500">{errors.achievements.message}</p>
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

export default UpdateStudentForm;
