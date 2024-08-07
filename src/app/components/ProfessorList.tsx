import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfessorCard from "./ProfessorCard"; // Importing the ProfessorCard component
import Modal from "react-modal";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(
    null
  );

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_PORT + "/api/professors/getall",
          {
            withCredentials: true,
          }
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

  const openModal = (professor: Professor) => {
    setSelectedProfessor(professor);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProfessor(null);
    setModalIsOpen(false);
  };

  if (loading) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] text-white text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] text-white font-bold text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="h-[89vh] md:h-[89vh] w-[98vw] md:w-[85vw] overflow-auto flex flex-col items-center p-4 bg-zinc-900 ">
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-zinc-900  mt-6 p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Professor <span className="text-blue-500">List</span>
        </h1>
        <div className="flex flex-col gap-1 ">
          {professors.map((professor) => (
            <div
              key={professor.professorId}
              className="p-4 bg-zinc-800  cursor-pointer flex flex-row gap-5 justify-self-stretch"
              onClick={() => openModal(professor)}
            >
              <div className=" flex flex-row gap-2">
                <span className=" hidden md:block text-lg font-bold text-white">
                  Name:
                </span>
                <p className="text-lg text-white">{professor.name}</p>
              </div>
              <div className=" flex flex-row gap-2">
                <span className=" hidden md:block text-lg font-bold text-white">
                  Department:
                </span>

                <p className="text-lg text-white">{professor.department}</p>
              </div>

              <div className=" flex flex-row gap-2">
                <span className="  hidden md:block text-lg font-bold text-white">
                  professorID:
                </span>
                <p className="text-lg text-white">{professor.professorId}</p>
              </div>
              <div className="hidden md:flex flex-row gap-2">
                <span className=" hidden md:block text-lg font-bold text-white">
                  mobileNumber:
                </span>

                <p className="text-lg text-white">{professor.mobileNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Professor Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="bg-neutral-950 rounded-lg shadow-lg p-6 max-w-2xl w-full">
          {selectedProfessor && <ProfessorCard professor={selectedProfessor} />}
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

export default ProfessorList;
