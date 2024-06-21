import { useState } from "react";
import toast from "react-hot-toast";

const useEnterProfessorData = () => {
  const [loading, setLoading] = useState(false);

  const createProfessor = async (professorData: any) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/professors/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(professorData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("professor created successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      return true;
    }
  };

  return { loading, createProfessor };
};

export default useEnterProfessorData;
