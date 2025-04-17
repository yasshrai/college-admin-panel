"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, XCircle } from "lucide-react"
import StudentCard from "./StudentCard"
interface FilterFormInputs {
  name?: string
  branch?: string
  department?: string
  rollNumber?: string
  scholarNumber?: string
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
  achivements?: string
}

interface Student {
  scholarNumber: string
  name: string
  branch: string
  department?: string
  mobileNumber: string
  rollNumber?: string
  enrollmentNumber?: string
  admissionYear?: number
  leaveUniversity?: boolean
  passOutYear?: number
  semester?: string
  section?: string
  subjectinHighSchool?: string
  regular?: boolean
  busFacility?: boolean
  achivements?: string
}

const FilterableStudentList = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FilterFormInputs>({
    defaultValues: {
      leaveUniversity: false,
      regular: false,
      busFacility: false,
    },
  })

  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const onSubmit = async (filters: FilterFormInputs) => {
    setLoading(true)
    setError(null)

    const filteredFiltersObj = filteredFilters(filters)
    console.log(filteredFiltersObj)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_PORT}/api/students/get/filter`,
        { filters: filteredFiltersObj },
        {
          withCredentials: true,
        },
      )
      setStudents(response.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch filtered students data")
      setLoading(false)
    }
  }

  const filteredFilters = (filters: FilterFormInputs) => {
    return Object.keys(filters).reduce(
      (acc, key) => {
        const value = filters[key as keyof FilterFormInputs]
        if (value !== undefined && value !== "" && value !== null && value !== false) {
          ;(acc as any)[key] = value
        }
        return acc
      },
      {} as Partial<FilterFormInputs>,
    )
  }

  const openDialog = (student: Student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  return (
    <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw]  overflow-auto custom-scrollbar p-4">
      <Card className="w-full md:w-[80%] mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-300">
            Filter <span className="text-blue-500">Students</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:w-[40vw] w-[70vw] mx-auto">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                
                placeholder="Enter name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch" className="text-white">
                Branch
              </Label>
              <Select onValueChange={(value) => setValue("branch", value)}>
                <SelectTrigger >
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="select_branch">Select branch</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="BSC">BSC</SelectItem>
                  <SelectItem value="BBA">BBA</SelectItem>
                  <SelectItem value="BCOM">BCOM</SelectItem>
                  <SelectItem value="BA">BA</SelectItem>
                  <SelectItem value="MCA">MCA</SelectItem>
                  <SelectItem value="BTech">BTech</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="BARCH">BARCH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-white">
                Department
              </Label>
              <Select onValueChange={(value) => setValue("department", value)}>
                <SelectTrigger >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="select_department">Select department</SelectItem>
                  <SelectItem value="School of Computer Science">School of Computer Science</SelectItem>
                  <SelectItem value="School of Management">School of Management</SelectItem>
                  <SelectItem value="School of Commerce">School of Commerce</SelectItem>
                  <SelectItem value="School of Fashion">School of Fashion</SelectItem>
                  <SelectItem value="School of LAW">School of LAW</SelectItem>
                  <SelectItem value="School of ARTS">School of ARTS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester" className="text-white">
                Semester
              </Label>
              <Select onValueChange={(value) => setValue("semester", value)}>
                <SelectTrigger >
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="select_semester">Select semester</SelectItem>
                  <SelectItem value="1st">1st</SelectItem>
                  <SelectItem value="2nd">2nd</SelectItem>
                  <SelectItem value="3rd">3rd</SelectItem>
                  <SelectItem value="4th">4th</SelectItem>
                  <SelectItem value="5th">5th</SelectItem>
                  <SelectItem value="6th">6th</SelectItem>
                  <SelectItem value="7th">7th</SelectItem>
                  <SelectItem value="8th">8th</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section" className="text-white">
                Section
              </Label>
              <Select onValueChange={(value) => setValue("section", value)}>
                <SelectTrigger >
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="select_section">Select section</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="H">H</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectinHighSchool" className="text-white">
                Subject in High School
              </Label>
              <Select onValueChange={(value) => setValue("subjectinHighSchool", value)}>
                <SelectTrigger >
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="select_subject">Select subject</SelectItem>
                  <SelectItem value="Commerce with CS">Commerce with CS</SelectItem>
                  <SelectItem value="Commerce with math">Commerce with math</SelectItem>
                  <SelectItem value="PCM">PCM</SelectItem>
                  <SelectItem value="PCB">PCB</SelectItem>
                  <SelectItem value="PCBM">PCBM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="text-white">
                Roll Number
              </Label>
              <Input
                id="rollNumber"
                {...register("rollNumber")}
                
                placeholder="Enter roll number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scholarNumber" className="text-white">
                Scholar Number
              </Label>
              <Input
                id="scholarNumber"
                {...register("scholarNumber")}
                
                placeholder="Enter scholar number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollmentNumber" className="text-white">
                Enrollment Number
              </Label>
              <Input
                id="enrollmentNumber"
                {...register("enrollmentNumber")}
                
                placeholder="Enter enrollment number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admissionYear" className="text-white">
                Admission Year
              </Label>
              <Input
                id="admissionYear"
                type="number"
                {...register("admissionYear")}
                
                placeholder="Enter admission year"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="leaveUniversity"
                onCheckedChange={(checked) => {
                  setValue("leaveUniversity", checked === true)
                }}
              />
              <Label htmlFor="leaveUniversity" className="text-white">
                Leave University
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passOutYear" className="text-white">
                Pass Out Year
              </Label>
              <Input
                id="passOutYear"
                type="number"
                {...register("passOutYear")}
                
                placeholder="Enter pass out year"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="regular"
                onCheckedChange={(checked) => {
                  setValue("regular", checked === true)
                }}
              />
              <Label htmlFor="regular" className="text-white">
                Regular
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="busFacility"
                onCheckedChange={(checked) => {
                  setValue("busFacility", checked === true)
                }}
              />
              <Label htmlFor="busFacility" className="text-white">
                Bus Facility
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="achivements" className="text-white">
                Achievements
              </Label>
              <Input
                id="achivements"
                {...register("achivements")}
                
                placeholder="Enter achievements"
              />
            </div>

            <div className="flex justify-between gap-4">
              <Button type="submit" className="flex-1 bg-zinc-700 hover:bg-blue-600 text-white" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                  </span>
                ) : (
                  "Filter"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                className="flex-1 border-zinc-600 hover:bg-zinc-600 text-white"
              >
                Reset
              </Button>
            </div>
          </form>

          {/* Display the filtered students */}
          <div className="w-full mt-6">
            {loading && (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && students.length === 0 && (
              <p className="text-white text-center">No students found.</p>
            )}
            {!loading && !error && students.length > 0 && (
              <div className="flex flex-col gap-1">
                {students.map((student) => (
                  <div
                    key={student.scholarNumber}
                    onClick={() => openDialog(student)}
                    className="p-4  rounded-md cursor-pointer flex flex-row gap-5 hover:bg-zinc-800 transition-colors"
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
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-white border-zinc-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-500">{selectedStudent?.name}</DialogTitle>
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

export default FilterableStudentList
