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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-[80vh] md:h-[89vh] w-[98vw] md:w-[85vw] overflow-auto flex flex-col items-center p-4 bg-gray-950">
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-950 mt-6 p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Professor <span className="text-blue-500">List</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {professors.map((professor) => (
            <div
              key={professor.professorId}
              className="p-4 bg-gray-800 rounded-lg cursor-pointer"
              onClick={() => openModal(professor)}
            >
              <h2 className="text-lg text-gray-300">{professor.name}</h2>
              <p className="text-sm text-gray-400">{professor.department}</p>
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
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
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
