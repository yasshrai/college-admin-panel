"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import StudentCard from "./StudentCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, GraduationCap, BookOpen, Hash, Phone, AlertCircle } from 'lucide-react'

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
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PORT}/api/students/getall`, {
          withCredentials: true,
        })
        setStudents(response.data)
        setFilteredStudents(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch students data")
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students)
    } else {
      const filtered = students.filter(
        student =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.scholarNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredStudents(filtered)
    }
  }, [searchQuery, students])

  const openDialog = (student: Student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-full flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Loading students...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-full flex flex-col items-center justify-center bg-background gap-4">
        <div className="rounded-full bg-destructive/10 p-3">
          <Loader2 className="h-8 w-8 text-destructive" />
        </div>
        <p className="text-xl font-medium">{error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="h-[89vh] md:h-[89vh] w-full overflow-hidden flex flex-col bg-background">
      <Card className="w-full mx-auto border-border shadow-md rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4 border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-2xl font-bold">
              Student <span className="text-primary">Directory</span>
            </CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9 bg-background/50 focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(89vh-8rem)]">
            <div className="divide-y divide-border">
              {filteredStudents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground mb-2">No students found matching your search</p>
                  <Button
                    variant="ghost"
                    onClick={() => setSearchQuery("")}
                    size="sm"
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.scholarNumber}
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                    onClick={() => openDialog(student)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border border-border bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary hidden md:block" />
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{student.name}</span>
                            {student.leaveUniversity && (
                              <Badge variant="destructive" className="text-xs">Left</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground hidden md:block" />
                          <span className="text-muted-foreground">{student.branch}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-muted-foreground hidden md:block" />
                          <span className="text-muted-foreground text-sm md:text-base">{student.scholarNumber}</span>
                        </div>
                      </div>
                      <Phone className="h-4 w-4 text-muted-foreground hidden md:block" />
                      <span className="text-muted-foreground hidden md:block">{student.mobileNumber}</span>
                      {student.leaveUniversity && (
                        <AlertCircle className="text-destructive h-5 w-5 md:hidden" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto border-border bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Student Details
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-auto max-h-[65vh] custom-scrollbar">
            {selectedStudent && <StudentCard student={selectedStudent} />}
          </div>


          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default StudentList
