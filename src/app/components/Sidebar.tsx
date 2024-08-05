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
          <div className="h-[85vh] md:h-[89vh] w-[98vw] md:w-[85vw] bg-zinc-900 flex items-center justify-center">
            <div>
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
        ? "bg-slate-300 text-black"
        : "hover:bg-slate-300 hover:text-black text-white"
    }`;
  };

  return (
    <div className="md:flex flex-row  bg-zinc-900 ">
      <div className="md:hidden w-full bg-neutral-950  ">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer text-white "
          onClick={toggleMenu}
        />
      </div>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block h-[89vh] bg-neutral-950 w-[99vw]  md:w-[30vw] z-20 md:z-0 `}
      >
        <nav className="flex  flex-col h-[70vh] w-full md:w-[15vw] items-center justify-stretch gap-3">
          <div className=" w-full">
            <div
              className={`flex flex-row items-center md:justify-evenly gap-1 p-3 cursor-pointer mb-6 ${
                selectedSection === "student"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleSectionClick("student")}
            >
              <PiStudentBold className="text-xl text-white" />
              <h1 className="font-bold text-xl text-white">Student Section</h1>
            </div>
            <div className="w-full md:w-[15vw]  h-[15vh] flex flex-col justify-center items-center mt-3 mb-3 ">
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
          <div className=" w-full">
            <div
              className={`flex flex-row items-center md:justify-evenly gap-1 p-3 cursor-pointer mb-6 ${
                selectedSection === "professor"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleSectionClick("professor")}
            >
              <FaChalkboardTeacher className="text-xl text-white" />
              <h1 className="font-bold text-sm md:text-xl text-white">
                Professor Section
              </h1>
            </div>
            <div className="w-full md:w-[15vw]  h-[15vh] flex flex-col justify-center items-center gap-1">
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
          <div className=" w-full">
            <div
              className={`flex flex-row items-center md:justify-evenly gap-1 p-3 cursor-pointer mb-2 ${
                selectedSection === "admin"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleSectionClick("admin")}
            >
              <FaChalkboardTeacher className="text-xl text-white" />
              <h1 className="font-bold text-sm md:text-xl text-white">
                Admin Section
              </h1>
            </div>
            <div className="w-full md:w-[15vw] h-[15vh] flex flex-col justify-center items-center gap-1">
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
