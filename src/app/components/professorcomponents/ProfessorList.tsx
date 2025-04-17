"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ProfessorCard from "./ProfessorCard"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

interface Professor {
  professorId: string
  name: string
  age: number
  department: string
  position: string
  mobileNumber: string
  emailAddress: string
  residenceAddress: string
}

const ProfessorList = () => {
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PORT}/api/professors/getall`, {
          withCredentials: true,
        })
        setProfessors(response.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch professors data")
        setLoading(false)
      }
    }

    fetchProfessors()
  }, [])

  const openDialog = (professor: Professor) => {
    setSelectedProfessor(professor)
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
    <div className="h-[89vh] md:h-[89vh] w-[98vw] md:w-[85vw] overflow-auto flex flex-col items-center p-4">
      <Card className="w-full md:w-[80%] mx-auto  border-zinc-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-300">
            Professor <span className="text-blue-500">List</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            {professors.map((professor) => (
              <div
                key={professor.professorId}
                className="p-4  rounded-md cursor-pointer flex flex-row gap-5 hover:bg-zinc-600 transition-colors"
                onClick={() => openDialog(professor)}
              >
                <div className="flex flex-row gap-2">
                  <p className="text-xl font-semibold text-blue-600">{professor.name}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="hidden md:block text-lg font-bold text-white">Department:</span>
                  <p className="text-lg text-white">{professor.department}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="hidden md:block text-lg font-bold text-white">Professor ID:</span>
                  <p className="text-lg text-white">{professor.professorId}</p>
                </div>
                <div className="hidden md:flex flex-row gap-2">
                  <span className="hidden md:block text-lg font-bold text-white">Mobile Number:</span>
                  <p className="text-lg text-white">{professor.mobileNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-zinc-900 text-white max-w-2xl">
          {selectedProfessor && <ProfessorCard professor={selectedProfessor} />}
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} className="bg-blue-500 hover:bg-blue-600">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProfessorList
