"use client";

import React, { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import HamburgMenu from "./HamburgMenu";
import HomeMessage from "./HomeMessage";
import StudentForm from "./form/StudentForm";
import ProfessorForm from "./form/ProfessorForm";
import Signup from "./Signup";
import ChangePasswordForm from "./form/ChangePasswordForm";
import UpdateProfessorRender from "./form/UpdateProfessorRender";
import UpdateStudentRender from "./form/UpdateStudentRender";
import StudentList from "./StudentList";
import ProfessorList from "./ProfessorList";
import FilterableStudentList from "./FilterableStudentList";

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
        return <UpdateStudentRender></UpdateStudentRender>;
      case "showStudents":
        return <StudentList></StudentList>;
      case "filterStudents":
        return <FilterableStudentList></FilterableStudentList>;
      case "addProfessor":
        return <ProfessorForm />;
      case "updateProfessor":
        return <UpdateProfessorRender></UpdateProfessorRender>;
      case "showProfessors":
        return <ProfessorList></ProfessorList>;
      case "addAdmin":
        return (
          <div className=" h-[89vh] w-[85vw] bg-gray-900 flex items-center justify-center">
            <div className=" h-[80vh] w-[40vw]">
              <Signup heading="create another admin  -"></Signup>
            </div>
          </div>
        );
      case "changePassword":
        return <ChangePasswordForm></ChangePasswordForm>;
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
              className="flex flex-row items-center justify-evenly gap-1 hover:bg-gray-700 w-[15vw] p-3 cursor-pointer mb-6"
              onClick={() => handleSectionClick("student")}
            >
              <span>
                <PiStudentBold className="text-xl"></PiStudentBold>
              </span>
              <h1 className="font-bold text-xl">Student Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center  mt-3 mb-3">
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("addStudent")}
              >
                Add Student Details
              </h2>
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("updateStudent")}
              >
                Update Student Details
              </h2>
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("showStudents")}
              >
                Show All Students
              </h2>
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("filterStudents")}
              >
                filterStudents
              </h2>
            </div>
          </div>
          <div>
            <div
              className="flex flex-row items-center justify-evenly gap-1 hover:bg-gray-700 w-[15vw] p-3 cursor-pointer mb-6"
              onClick={() => handleSectionClick("professor")}
            >
              <span>
                <FaChalkboardTeacher className="text-xl"></FaChalkboardTeacher>
              </span>
              <h1 className="font-bold text-xl">Professor Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-1">
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("addProfessor")}
              >
                Add Professor Details
              </h2>
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("updateProfessor")}
              >
                Update Professor Details
              </h2>
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("showProfessors")}
              >
                Show All Professors
              </h2>
            </div>
          </div>
          <div>
            <div
              className="flex flex-row items-center justify-evenly gap-1 hover:bg-gray-700 w-[15vw] p-3 cursor-pointer mb-6"
              onClick={() => handleSectionClick("admin")}
            >
              <span>
                <FaChalkboardTeacher className="text-xl"></FaChalkboardTeacher>
              </span>
              <h1 className="font-bold text-xl">Admin Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-1">
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
                onClick={() => handleSectionClick("addAdmin")}
              >
                Add Admin Details
              </h2>
              <h2
                className="cursor-pointer w-full flex items-center justify-center py-2 hover:bg-indigo-400 hover:text-black transition ease-in-out duration-100"
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
