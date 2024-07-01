import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "./StudentCard"; // Importing the StudentCard component
import toast from "react-hot-toast";

interface Student {
  scholarNumber: string;
  name: string;
  branch: string;
  department?: string;
  rollNumber?: string;
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

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/students/getall"
        );
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students data");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-[89vh] w-[85vw] bg-gray-900 overflow-auto flex flex-col items-center p-4">
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-900 mt-6 p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Student <span className="text-blue-500">List</span>
        </h1>
        {students.map((student) => (
          <StudentCard key={student.scholarNumber} student={student} />
        ))}
      </div>
    </div>
  );
};

export default StudentList;
