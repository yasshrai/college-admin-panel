"use client"
import { useState } from "react"
import { GraduationCap, Menu, School, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import StudentList from "../studentcomponents/StudentList"
import StudentForm from "../form/studentform/StudentForm"
import FilterableStudentList from "../studentcomponents/FilterableStudentList"
import UpdateProfessorRender from "../form/professorform/UpdateProfessorRender"
import ProfessorForm from "../form/professorform/ProfessorForm"
import UpdateStudentRender from "../form/studentform/UpdateStudentRender"
import ChangePasswordForm from "../form/ChangePasswordForm"
import ProfessorList from "../professorcomponents/ProfessorList"
import Signup from "./Signup"
import HomeMessage from "./HomeMessage"
import AdminList from "../Admin/AdminList"


const AdminSidebar = () => {
  const [selectedSection, setSelectedSection] = useState("home")

  const handleSectionClick = (section: string) => {
    setSelectedSection(section)
  }

  const renderContent = () => {
    switch (selectedSection) {
      case "addStudent":
        return <StudentForm />
      case "updateStudent":
        return <UpdateStudentRender />
      case "showStudents":
        return (
          <div className="flex  h-screen w-screen md:h-[90vh] md:w-[80vw] flex-col items-center justify-center bg-background ">
            <div>
              <StudentList />
            </div>
          </div>
        )
      case "filterStudents":
        return <FilterableStudentList />
      case "addProfessor":
        return <ProfessorForm />
      case "updateProfessor":
        return <UpdateProfessorRender />
      case "showProfessors":
        return (
          <div className="flex  h-screen w-screen md:h-[90vh] md:w-[80vw] flex-col items-center justify-center bg-background ">
            <div>
              <ProfessorList />
            </div>
          </div>
        )
      case "addAdmin":
        return (
          <div className="flex h-[90vh] w-[80vw] flex-col items-center justify-center bg-background md:h-[89vh]">
            <div>
              <Signup heading="create another admin -" />
            </div>
          </div>
        )
      case "changePassword":
        return <ChangePasswordForm />
      case "showAdmins":
        return <AdminList />;

      default:
        return (
          <div className="flex h-[90vh] w-[80vw] flex-col items-center justify-center bg-background md:h-[89vh]">
            <div>
              <HomeMessage></HomeMessage>
            </div>
          </div>
        )
    }
  }

  // Mobile sidebar using Sheet component
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SidebarContent className="w-full">
          <StudentSection />
          <ProfessorSection />
          <AdminSection />
        </SidebarContent>
      </SheetContent>
    </Sheet>
  )

  // Student section component
  const StudentSection = () => (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          <span>Student Section</span>
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "addStudent"}
              onClick={() => handleSectionClick("addStudent")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "addStudent" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Add Student Details
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "updateStudent"}
              onClick={() => handleSectionClick("updateStudent")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "updateStudent" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Update Student Details
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "showStudents"}
              onClick={() => handleSectionClick("showStudents")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "showStudents" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Show All Students
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "filterStudents"}
              onClick={() => handleSectionClick("filterStudents")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "filterStudents" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Filter Students
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )

  // Professor section component
  const ProfessorSection = () => (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex items-center gap-2">
          <School className="h-4 w-4" />
          <span>Professor Section</span>
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "addProfessor"}
              onClick={() => handleSectionClick("addProfessor")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "addProfessor" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Add Professor Details
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "updateProfessor"}
              onClick={() => handleSectionClick("updateProfessor")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "updateProfessor" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Update Professor Details
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "showProfessors"}
              onClick={() => handleSectionClick("showProfessors")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "showProfessors" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Show All Professors
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )

  // Admin section component
  const AdminSection = () => (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex items-center gap-2">
          <UserCog className="h-4 w-4" />
          <span>Admin Section</span>
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "addAdmin"}
              onClick={() => handleSectionClick("addAdmin")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "addAdmin" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Add Admin Details
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "showAdmins"}
              onClick={() => handleSectionClick("showAdmins")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "showAdmins" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Show All Admins
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={selectedSection === "changePassword"}
              onClick={() => handleSectionClick("changePassword")}
              className={`hover:bg-slate-200 hover:text-black ${selectedSection === "changePassword" ? "bg-slate-200 text-black" : "text-white"
                }`}
            >
              Change Password
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row">
        <MobileSidebar />
        <Sidebar className="hidden md:flex">
          <SidebarHeader className="h-16 border-b">
            <div className="flex items-center px-4">
              <h2 className="text-lg font-semibold">Admin Panel</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <StudentSection />
            <ProfessorSection />
            <AdminSection />
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex-1 overflow-hidden">
          <div className="h-[80vh] ">{renderContent()}</div>
        </SidebarInset>

      </div>
    </SidebarProvider>
  )
}

export default AdminSidebar
