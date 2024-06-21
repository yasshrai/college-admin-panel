import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfessorCard from "./ProfessorCard"; // Importing the ProfessorCard component

interface Professor {
  professorId: string;
  name: string;
  age: number;
  department: string;
  position: string;
  mobileNumber: string;
  emailAddress: string;
  residenceAddress: string;
}

const ProfessorList: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/professors/getall"
        );
        setProfessors(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch professors data");
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-[89vh] w-[85vw] overflow-auto flex flex-col items-center p-4 bg-gray-900">
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-900 mt-6 p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Professor <span className="text-blue-500">List</span>
        </h1>
        {professors.map((professor) => (
          <ProfessorCard key={professor.professorId} professor={professor} />
        ))}
      </div>
    </div>
  );
};

export default ProfessorList;
