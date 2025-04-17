"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import UpdateProfessorForm from "./UpdateProfessorForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface ProfessorFormDataForUpdate {
  professorId: string
}

const UpdateProfessorRender = () => {
  const [submittedProfessorId, setSubmittedProfessorId] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfessorFormDataForUpdate>()

  const onSubmit = (data: ProfessorFormDataForUpdate) => {
    setSubmittedProfessorId(data.professorId)
    reset() // Reset the form after submission
  }

  return (
    <div className="h-[89vh] md:h-[89vh] w-[98vw] md:w-[85vw]  overflow-auto flex flex-col items-center p-4">
      <Card className="w-[80vw] md:w-[40vw] mx-auto border-zinc-700 mb-6">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="professorId" className="text-white">
                Professor ID
              </Label>
              <Input
                id="professorId"
                {...register("professorId", {
                  required: "Professor ID is required",
                })}
                className=" border-zinc-600 text-white"
                placeholder="Enter Professor ID"
              />
              {errors.professorId && <p className="text-red-500 text-sm">{errors.professorId.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-zinc-700 hover:bg-blue-600 text-white">
              Find Professor
            </Button>
          </form>
        </CardContent>
      </Card>

      {submittedProfessorId && (
        <div className="w-full">
          <UpdateProfessorForm key={submittedProfessorId} professorId={submittedProfessorId} />
        </div>
      )}
    </div>
  )
}

export default UpdateProfessorRender
