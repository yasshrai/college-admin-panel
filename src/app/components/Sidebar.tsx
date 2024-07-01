"use client";

import React, { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
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
import AdminList from "./AdminList";

const Sidebar = () => {
  const [selectedSection, setSelectedSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionClick = (section: any) => {
    setSelectedSection(section);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "addStudent":
        return <StudentForm />;
      case "updateStudent":
        return <UpdateStudentRender />;
      case "showStudents":
        return <StudentList />;
      case "filterStudents":
        return <FilterableStudentList />;
      case "addProfessor":
        return <ProfessorForm />;
      case "updateProfessor":
        return <UpdateProfessorRender />;
      case "showProfessors":
        return <ProfessorList />;
      case "addAdmin":
        return (
          <div className="h-[89vh] w-[85vw] bg-gray-900 flex items-center justify-center">
            <div className="h-[80vh] w-[40vw]">
              <Signup heading="create another admin -" />
            </div>
          </div>
        );
      case "changePassword":
        return <ChangePasswordForm />;
      case "showAdmins":
        return <AdminList />;
      default:
        return <HomeMessage />;
    }
  };

  const getMenuItemClass = (section: any) => {
    return `cursor-pointer w-full flex items-center justify-center py-2 transition ease-in-out duration-100 ${
      selectedSection === section
        ? "bg-indigo-400 text-black"
        : "hover:bg-indigo-400 hover:text-black"
    }`;
  };

  return (
    <div className="flex flex-row">
      <div className="md:hidden">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer m-2"
          onClick={toggleMenu}
        />
      </div>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block h-[89vh] bg-gray-950 w-[40vw] md:w-[15vw] z-10`}
      >
        <nav className="flex flex-col h-[70vh] w-36 md:w-[15vw] items-center justify-stretch gap-3">
          <div>
            <div
              className={`flex flex-row items-center justify-evenly gap-1 p-3 cursor-pointer mb-6 ${
                selectedSection === "student"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleSectionClick("student")}
            >
              <PiStudentBold className="text-xl" />
              <h1 className="font-bold text-xl">Student Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center mt-3 mb-3">
              <h2
                className={getMenuItemClass("addStudent")}
                onClick={() => handleSectionClick("addStudent")}
              >
                Add Student Details
              </h2>
              <h2
                className={getMenuItemClass("updateStudent")}
                onClick={() => handleSectionClick("updateStudent")}
              >
                Update Student Details
              </h2>
              <h2
                className={getMenuItemClass("showStudents")}
                onClick={() => handleSectionClick("showStudents")}
              >
                Show All Students
              </h2>
              <h2
                className={getMenuItemClass("filterStudents")}
                onClick={() => handleSectionClick("filterStudents")}
              >
                Filter Students
              </h2>
            </div>
          </div>
          <div>
            <div
              className={`flex flex-row items-center justify-evenly gap-1 p-3 cursor-pointer mb-6 ${
                selectedSection === "professor"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleSectionClick("professor")}
            >
              <FaChalkboardTeacher className="text-xl" />
              <h1 className="font-bold text-xl">Professor Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-1">
              <h2
                className={getMenuItemClass("addProfessor")}
                onClick={() => handleSectionClick("addProfessor")}
              >
                Add Professor Details
              </h2>
              <h2
                className={getMenuItemClass("updateProfessor")}
                onClick={() => handleSectionClick("updateProfessor")}
              >
                Update Professor Details
              </h2>
              <h2
                className={getMenuItemClass("showProfessors")}
                onClick={() => handleSectionClick("showProfessors")}
              >
                Show All Professors
              </h2>
            </div>
          </div>
          <div>
            <div
              className={`flex flex-row items-center justify-evenly gap-1 p-3 cursor-pointer mb-2 ${
                selectedSection === "admin"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleSectionClick("admin")}
            >
              <FaChalkboardTeacher className="text-xl" />
              <h1 className="font-bold text-xl">Admin Section</h1>
            </div>
            <div className="w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-1">
              <h2
                className={getMenuItemClass("addAdmin")}
                onClick={() => handleSectionClick("addAdmin")}
              >
                Add Admin Details
              </h2>
              <h2
                className={getMenuItemClass("showAdmins")}
                onClick={() => handleSectionClick("showAdmins")}
              >
                Show all Admins
              </h2>
              <h2
                className={getMenuItemClass("changePassword")}
                onClick={() => handleSectionClick("changePassword")}
              >
                Change Password
              </h2>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
