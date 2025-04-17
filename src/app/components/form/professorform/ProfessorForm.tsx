"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProfessorFormInputs = {
  name: string
  age: number
  department: string
  position: string
  professorId: string
  mobileNumber: string
  emailAddress: string
  residenceAddress: string
}

const ProfessorForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfessorFormInputs>()
  const [loading, setLoading] = useState(false)
  const [professorId, setProfessorId] = useState<string>("")

  const createProfessor = async (data: ProfessorFormInputs) => {
    setLoading(true)
    try {
      // Replace with your actual API endpoint
      await axios.post(`${process.env.NEXT_PUBLIC_API_PORT}/api/professors/create`, data, { withCredentials: true })
      toast({
        title: "Success",
        description: "Professor added successfully",
      })
      return true
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add professor",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ProfessorFormInputs) => {
    const success = await createProfessor(data)
    if (success) {
      reset()
      setProfessorId("")
    }
  }

  const generateRandomProfessorId = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PORT}/api/professors//get/uniqueprofessorid`, {
        withCredentials: true,
      })
      const newProfessorID = response.data.professorId
      setProfessorId(newProfessorID)
      setValue("professorId", newProfessorID)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error while generating professor ID",
      })
    }
  }

  return (
    <div className="h-[87vh] md:h-[89vh] w-[99vw] md:w-[85vw]  overflow-auto p-4">
      <Card className="w-[80vw] md:w-[40vw] mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-300">
            Add <span className="text-blue-500">Professor</span>
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
              <Select onValueChange={(value) => setValue("department", value)} defaultValue="select_department">
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
              <Select onValueChange={(value) => setValue("position", value)} defaultValue="select_position">
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
                value={professorId}
                onChange={(e) => setProfessorId(e.target.value)}
                className=""
              />
              <Button
                type="button"
                onClick={generateRandomProfessorId}
                variant="outline"
                className="w-full mt-2 border-zinc-600 hover:bg-blue-700 hover:text-white transition-colors"
              >
                Generate Unique ProfessorID
              </Button>
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
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfessorForm
