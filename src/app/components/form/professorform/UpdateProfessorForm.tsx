"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the types for the form data
export interface ProfessorFormData {
  name: string
  age: number
  department: string
  position: string
  professorId: string
  mobileNumber: string
  emailAddress: string
  residenceAddress: string
}

// Define the props type
interface UpdateProfessorFormProps {
  professorId: string
}

const UpdateProfessorForm: React.FC<UpdateProfessorFormProps> = ({ professorId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfessorFormData>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_PORT}/api/professors/update/${professorId}`,
          {},
          { withCredentials: true },
        )
        const professor = response.data

        // Populate the form with the fetched data
        reset(professor)

        // Set select values
        if (professor.department) {
          setValue("department", professor.department)
        }
        if (professor.position) {
          setValue("position", professor.position)
        }

        setLoading(false)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch the professor data")
        setLoading(false)
      }
    }

    fetchProfessorData()
  }, [professorId, reset, setValue])

  const onSubmit = async (data: ProfessorFormData) => {
    setLoading(true)
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_PORT}/api/professors/update/${professorId}`, data, {
        withCredentials: true,
      })
      toast({
        title: "Success",
        description: "Professor data updated successfully",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to update professor data",
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
    <Card className="w-[80vw] md:w-[40vw] mx-auto border-zinc-700">
      <CardHeader>
        <CardTitle className="text-xl text-center text-gray-300">
          Update <span className="text-blue-500">Professor</span>
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
              className=""
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-white">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              {...register("age", { required: "Age is required" })}
              className=""
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-white">
              Department
            </Label>
            <Select onValueChange={(value) => setValue("department", value)} defaultValue="">
              <SelectTrigger className="">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
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
            <Label htmlFor="position" className="text-white">
              Position
            </Label>
            <Select onValueChange={(value) => setValue("position", value)} defaultValue="">
              <SelectTrigger className="">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select_position">Select position</SelectItem>
                <SelectItem value="assistant professor">Assistant Professor</SelectItem>
                <SelectItem value="Head of Department">Head of Department</SelectItem>
                <SelectItem value="senior professor">Senior Professor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="professorId" className="text-white">
              Professor ID
            </Label>
            <Input
              id="professorId"
              {...register("professorId")}
              disabled
              className=" opacity-60"
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
              className=""
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
              className=""
            />
            {errors.emailAddress && <p className="text-red-500 text-sm">{errors.emailAddress.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="residenceAddress" className="text-white">
              Residence Address
            </Label>
            <Input
              id="residenceAddress"
              {...register("residenceAddress")}
              className=""
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

export default UpdateProfessorForm
