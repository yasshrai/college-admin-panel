import { useState } from "react";
import toast from "react-hot-toast";
import { ProfessorFormData } from "../components/form/professorform/UpdateProfessorForm";

const useEnterProfessorData = () => {
  const [loading, setLoading] = useState(false);

  const createProfessor = async (professorData: ProfessorFormData) => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_PORT + "/api/professors/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(professorData),
          credentials: "include",
        }
      );
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
