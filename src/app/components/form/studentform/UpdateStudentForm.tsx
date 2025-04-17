"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
// import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
// Define the types for the form data
interface StudentFormInputs {
  name: string
  branch: string
  department?: string
  rollNumber?: string
  scholarNumber: string
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

// Define the props type
interface UpdateStudentFormProps {
  scholarNumber: string
}

const UpdateStudentForm: React.FC<UpdateStudentFormProps> = ({ scholarNumber }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StudentFormInputs>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_PORT}/api/students/update/${scholarNumber}`,
          {},
          {
            withCredentials: true,
          }
        )
        const student = response.data

        // Populate the form with the fetched data
        reset(student)

        // Set select values
        if (student.branch) {
          setValue("branch", student.branch)
        }
        if (student.department) {
          setValue("department", student.department)
        }
        if (student.semester) {
          setValue("semester", student.semester)
        }
        if (student.section) {
          setValue("section", student.section)
        }
        if (student.subjectinHighSchool) {
          setValue("subjectinHighSchool", student.subjectinHighSchool)
        }

        setLoading(false)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch the student data")
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [scholarNumber, reset, setValue])

  const onSubmit = async (data: StudentFormInputs) => {
    setLoading(true)
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_PORT}/api/students/update/${scholarNumber}`,
        data,
        {
          withCredentials: true,
        }
      )
      toast({
        title: "Success",
        description: "Student data updated successfully",
      })
      
    } catch (err) {
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update student",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-8">
        <h1 className="text-white font-bold text-center text-3xl">{error}</h1>
        <h1 className="text-white font-bold text-center text-xl">Please check the details</h1>
      </div>
    )
  }

  return (
    <Card className="w-[99vw] md:w-[40vw] mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center text-gray-300">
          Update <span className="text-blue-500">Student</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
             
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-white">
              Branch
            </Label>
            <Select onValueChange={(value) => setValue("branch", value)} defaultValue="">
              <SelectTrigger>
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
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-white">
              Department
            </Label>
            <Select onValueChange={(value) => setValue("department", value)} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="select_department">Select department</SelectItem>
                <SelectItem value="School of Computer Science">School of Computer Science</SelectItem>
                <SelectItem value="School of Management">School of Management</SelectItem>
                <SelectItem value="School of Commerce">School of Commerce</SelectItem>
                <SelectItem value="School of Fashion">School of Fashion</SelectItem>
                <SelectItem value="School of LAW">School of LAW</SelectItem>
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
             
              placeholder="12345"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scholarNumber" className="text-white">
              Scholar Number
            </Label>
            <Input
              id="scholarNumber"
              {...register("scholarNumber", { required: "Scholar Number is required" })}
              disabled
              className=" text-white opacity-60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollmentNumber" className="text-white">
              Enrollment Number
            </Label>
            <Input
              id="enrollmentNumber"
              {...register("enrollmentNumber")}
             
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
             
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber" className="text-white">
              Mobile Number
            </Label>
            <Input
              id="mobileNumber"
              {...register("mobileNumber", {
                pattern: {
                  value: /^\d{10}$/,
                  message: "Mobile number must be 10 digits",
                },
              })}
             
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailAddress" className="text-white">
              Email Address
            </Label>
            <Input
              id="emailAddress"
              type="email"
              {...register("emailAddress", {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email address is invalid",
                },
              })}
             
            />
            {errors.emailAddress && <p className="text-red-500 text-sm">{errors.emailAddress.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fatherName" className="text-white">
              Father Name
            </Label>
            <Input
              id="fatherName"
              {...register("fatherName")}
             
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motherName" className="text-white">
              Mother Name
            </Label>
            <Input
              id="motherName"
              {...register("motherName")}
             
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="residenceAddress" className="text-white">
              Residence Address
            </Label>
            <Input
              id="residenceAddress"
              {...register("residenceAddress")}
             
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentContactNumber" className="text-white">
              Parent Contact Number
            </Label>
            <Input
              id="parentContactNumber"
              {...register("parentContactNumber", {
                pattern: {
                  value: /^\d{10}$/,
                  message: "Parent contact number must be 10 digits",
                },
              })}
             
            />
            {errors.parentContactNumber && (
              <p className="text-red-500 text-sm">{errors.parentContactNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester" className="text-white">
              Semester
            </Label>
            <Select onValueChange={(value) => setValue("semester", value)} defaultValue="">
              <SelectTrigger>
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
            <Select onValueChange={(value) => setValue("section", value)} defaultValue="">
              <SelectTrigger>
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
            <Select onValueChange={(value) => setValue("subjectinHighSchool", value)} defaultValue="">
              <SelectTrigger>
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
             
            />
          </div>

          <Button type="submit" className="w-full bg-zinc-700 hover:bg-blue-600 text-white" disabled={loading}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdateStudentForm
