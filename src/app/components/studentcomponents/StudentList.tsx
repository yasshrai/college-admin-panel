import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "./StudentCard"; // Importing the StudentCard component
import Modal from "react-modal";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_PORT + "/api/students/getall",
          {
            withCredentials: true,
          }
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

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalIsOpen(false);
  };

  if (loading) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] flex items-center justify-center ">
        <div className=" size-96 loading loading-spinner text-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] text-white font-bold text-xl">
        {" "}
        {error}
      </div>
    );
  }

  return (
    <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] bg-zinc-900 overflow-auto flex flex-col items-center p-4">
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-zinc-900 mt-6 p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Student <span className="text-blue-500">List</span>
        </h1>
        <div className="flex flex-col gap-1 ">
          {students.map((student) => (
            <div
              key={student.scholarNumber}
              className="p-4 bg-zinc-800  cursor-pointer flex flex-row gap-5 justify-self-stretch"
              onClick={() => openModal(student)}
            >
              <div className=" flex flex-row gap-2">
                <p className="text-xl font-semibold text-blue-600">
                  {student.name}
                </p>
              </div>
              <div className=" flex flex-row gap-2">
                <span className=" hidden md:block text-lg font-bold text-white">
                  Branch:
                </span>

                <p className="text-lg text-white">{student.branch}</p>
              </div>

              <div className=" flex flex-row gap-2">
                <span className="  hidden md:block text-lg font-bold text-white">
                  scholarNumber:
                </span>
                <p className="text-lg text-white">{student.scholarNumber}</p>
              </div>
              <div className=" flex flex-row gap-2">
                <span className=" hidden md:block text-lg font-bold text-white">
                  mobileNumber:
                </span>

                <p className="text-lg text-white">{student.mobileNumber}</p>
              </div>
              {student.leaveUniversity && <p className="text-red-500">❌</p>}
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Student Modal"
        className="flex justify-center items-center overflow-auto"
        overlayClassName="fixed inset-0 bg-neutral-950 bg-opacity-75  overflow-auto"
      >
        <div className="bg-neutral-950 rounded-lg shadow-lg p-6 max-w-2xl w-full">
          {selectedStudent && <StudentCard student={selectedStudent} />}
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StudentList;
