"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ProfessorCard from "./ProfessorCard"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Search, User, Briefcase, Phone, Hash } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PORT}/api/professors/getall`, {
          withCredentials: true,
        })
        setProfessors(response.data)
        setFilteredProfessors(response.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch professors data")
        setLoading(false)
      }
    }

    fetchProfessors()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProfessors(professors)
    } else {
      const filtered = professors.filter(
        professor =>
          professor.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProfessors(filtered)
    }
  }, [searchQuery, professors])

  const openDialog = (professor: Professor) => {
    setSelectedProfessor(professor)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="h-[90vh] md:h-[89vh] w-full flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Loading professors...</p>
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
    <div className="h-[89vh] md:h-[89vh] w-full overflow-hidden  flex flex-col items-center bg-background">
      <Card className="w-full mx-auto border-border shadow-md rounded-lg overflow-hidden ">
        <CardHeader className="bg-muted/30 pb-4 border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-2xl font-bold">
              Professor <span className="text-primary">Directory</span>
            </CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search professors..."
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
              {filteredProfessors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground mb-2">No professors found matching your search</p>
                  <Button
                    variant="ghost"
                    onClick={() => setSearchQuery("")}
                    size="sm"
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                filteredProfessors.map((professor) => (
                  <div
                    key={professor.professorId}
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                    onClick={() => openDialog(professor)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border border-border bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(professor.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary hidden md:block" />
                          <span className="font-medium text-foreground">{professor.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground hidden md:block" />
                          <span className="text-muted-foreground">{professor.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-muted-foreground hidden md:block" />
                          <span className="text-muted-foreground text-sm md:text-base">{professor.professorId}</span>
                        </div>
                      </div>
                      <Phone className="h-4 w-4 text-muted-foreground hidden md:block" />
                      <span className="text-muted-foreground hidden md:block">{professor.mobileNumber}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl border-border bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Professor Details
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[65vh] custom-scrollbar">

            {selectedProfessor && <ProfessorCard professor={selectedProfessor} />}
          </div>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProfessorList
