"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import StudentCard from "./StudentCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, XCircle } from 'lucide-react'

interface Student {
  scholarNumber: string
  name: string
  branch: string
  department?: string
  rollNumber?: string
  enrollmentNumber?: string
  admissionYear?: number
  leaveUniversity?: boolean
  passOutYear?: number
  mobileNumber?: string
  emailAddress?: string
  fatherName?: string
  motherName?: string
  residenceAddress?: string
  parentContactNumber?: string
  semester?: string
  section?: string
  subjectinHighSchool?: string
  regular?: boolean
  busFacility?: boolean
  achievements?: string
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PORT}/api/students/getall`, {
          withCredentials: true,
        })
        setStudents(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch students data")
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const openDialog = (student: Student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] flex items-center justify-center bg-zinc-950">
        <Loader2 className="h-24 w-24 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw] text-white font-bold text-xl flex items-center justify-center bg-zinc-950">
        {error}
      </div>
    )
  }

  return (
    <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw]  overflow-auto flex flex-col items-center p-4">
      <Card className="w-full md:w-[80%] ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-300">
            Student <span className="text-blue-500">List</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            {students.map((student) => (
              <div
                key={student.scholarNumber}
                className="p-4  rounded-md cursor-pointer flex flex-row gap-5 hover:bg-zinc-800 transition-colors"
                onClick={() => openDialog(student)}
              >
                <div className="flex flex-row gap-2">
                  <p className="text-xl font-semibold text-blue-600">{student.name}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="hidden md:block text-lg font-bold text-white">Branch:</span>
                  <p className="text-lg text-white">{student.branch}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="hidden md:block text-lg font-bold text-white">scholarNumber:</span>
                  <p className="text-lg text-white">{student.scholarNumber}</p>
                </div>
                <div className="hidden md:flex flex-row gap-2">
                  <span className="hidden md:block text-lg font-bold text-white">mobileNumber:</span>
                  <p className="text-lg text-white">{student.mobileNumber}</p>
                </div>
                {student.leaveUniversity && <XCircle className="text-red-500 h-6 w-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-white border-zinc-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-500">
              {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedStudent && <StudentCard student={selectedStudent} />}
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StudentList
