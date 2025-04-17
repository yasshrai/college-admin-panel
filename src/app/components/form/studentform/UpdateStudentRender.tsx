"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import UpdateStudentForm from "./UpdateStudentForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface StudentFormDataForUpdate {
  scholarNumber: string
}

const UpdateStudentRender = () => {
  const [submittedScholarNumber, setSubmittedScholarNumber] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormDataForUpdate>()

  const onSubmit = (data: StudentFormDataForUpdate) => {
    setSubmittedScholarNumber(data.scholarNumber)
    reset() // Reset the form after submission
  }

  return (
    <div className="h-[90vh] md:h-[89vh] w-[99vw] md:w-[85vw]  overflow-auto flex flex-col items-center p-4">
      <Card className="w-[80vw] md:w-[40vw] mx-auto mb-6">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scholarNumber" className="text-white">
                Scholar Number
              </Label>
              <Input
                id="scholarNumber"
                {...register("scholarNumber", {
                  required: "Scholar Number is required",
                })}
                className="text-white"
                placeholder="Enter Scholar Number"
              />
              {errors.scholarNumber && <p className="text-red-500 text-sm">{errors.scholarNumber.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-zinc-700 hover:bg-blue-600 text-white">
              Find Student
            </Button>
          </form>
        </CardContent>
      </Card>

      {submittedScholarNumber && (
        <div className="w-full">
          <UpdateStudentForm key={submittedScholarNumber} scholarNumber={submittedScholarNumber} />
        </div>
      )}
    </div>
  )
}

export default UpdateStudentRender
