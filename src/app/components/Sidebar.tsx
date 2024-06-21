"use client";

import React, { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import HamburgMenu from "./HamburgMenu";
import HomeMessage from "./HomeMessage";
import StudentForm from "./form/StudentForm";
import ProfessorForm from "./form/ProfessorForm";

const Sidebar = () => {
  // State to track the selected section
  const [selectedSection, setSelectedSection] = useState("home");

  // Function to handle button clicks and update the state
  const handleSectionClick = (section: any) => {
    setSelectedSection(section);
  };

  // Render the appropriate component based on the selected section
  const renderContent = () => {
    switch (selectedSection) {
      case "addStudent":
        return <StudentForm />;
      case "updateStudent":
        return <div>Update Student Component</div>;
      case "showStudents":
        return <div>Show All Students Component</div>;
      case "addProfessor":
        return <ProfessorForm />;
      case "updateProfessor":
        return <div>Update Professor Component</div>;
      case "showProfessors":
        return <div>Show All Professors Component</div>;
      case "addAdmin":
        return <div>Add Admin Component</div>;
      case "changePassword":
        return <div>Change Password Component</div>;
      default:
        return <HomeMessage />;
    }
  };

  return (
    <div className="flex flex-row">
      <HamburgMenu></HamburgMenu>
      <div className="hidden md:block h-[89vh] bg-gray-950 w-[15vw]">
        <nav className="flex flex-col h-[70vh] w-[15vw] items-center justify-stretch gap-3">
          <div>
            <div
              className="flex flex-row items-center justify-evenly gap-1 hover:bg-gray-700 w-[15vw] p-3 cursor-pointer"
              onClick={() => handleSectionClick("student")}
            >
              <span>
                <PiStudentBold className="text-xl"></PiStudentBold>
              </span>
              <h1 className="font-bold text-xl">Student Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-3">
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("addStudent")}
              >
                Add Student Details
              </h2>
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("updateStudent")}
              >
                Update Student Details
              </h2>
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("showStudents")}
              >
                Show All Students
              </h2>
            </div>
          </div>
          <div>
            <div
              className="flex flex-row items-center justify-evenly gap-1 hover:bg-gray-700 w-[15vw] p-3 cursor-pointer"
              onClick={() => handleSectionClick("professor")}
            >
              <span>
                <FaChalkboardTeacher className="text-xl"></FaChalkboardTeacher>
              </span>
              <h1 className="font-bold text-xl">Professor Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-3">
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("addProfessor")}
              >
                Add Professor Details
              </h2>
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("updateProfessor")}
              >
                Update Professor Details
              </h2>
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("showProfessors")}
              >
                Show All Professors
              </h2>
            </div>
          </div>
          <div>
            <div
              className="flex flex-row items-center justify-evenly gap-1 hover:bg-gray-700 w-[15vw] p-3 cursor-pointer"
              onClick={() => handleSectionClick("admin")}
            >
              <span>
                <FaChalkboardTeacher className="text-xl"></FaChalkboardTeacher>
              </span>
              <h1 className="font-bold text-xl">Admin Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-3">
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("addAdmin")}
              >
                Add Admin Details
              </h2>
              <h2
                className="cursor-pointer"
                onClick={() => handleSectionClick("changePassword")}
              >
                Change Password
              </h2>
            </div>
          </div>
        </nav>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
