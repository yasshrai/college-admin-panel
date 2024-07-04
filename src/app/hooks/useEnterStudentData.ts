import { useState } from "react";
import toast from "react-hot-toast";

const useEnterStudentData = () => {
  const [loading, setLoading] = useState(false);

  const createStudent = async (studentData: any) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/students/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Student created successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      return true;
    }
  };

  return { loading, createStudent };
};

export default useEnterStudentData;
