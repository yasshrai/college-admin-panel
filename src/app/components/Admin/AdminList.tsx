"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import AdminCard from "./AdminCard"

interface Admin {
  name: string
  username: string
  email: string
}

const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_PORT + "/api/admin/getalladmin",
          { withCredentials: true }
        )
        setAdmins(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch admin data")
        setLoading(false)
      }
    }

    fetchAdmins()
  }, [])

  if (loading) {
    return (

      <div className="flex h-screen w-[80vw] items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center">Admin List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>


    )
  }

  if (error) {
    return (
      <div className="flex h-screen w-[80vw] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
      <div className="flex h-screen w-[80vw] flex-col items-center justify-center overflow-auto custom-scrollbar p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">
            Admin <span className="text-primary">List</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {admins.map((admin) => (
            <AdminCard key={admin.username} admin={admin} />
          ))}
        </CardContent>
      </Card>
    </div>

  )
}

export default AdminList
