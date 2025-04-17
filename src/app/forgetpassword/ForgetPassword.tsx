"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
// import { toast } from "sonner"

const validatePassword = (newPassword: string, confirmPassword: string) => {
  if (newPassword.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long",
    }
  }
  if (newPassword !== confirmPassword) {
    return { success: false, error: "Passwords do not match" }
  }
  return { success: true, error: "" }
}

const ForgetPassword = () => {
  const [username, setUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [followUp, setFollowUp] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  // This is a placeholder - replace with your actual forgetPassword function
  const forgetPassword = async (username: string, newPassword: string, followUp: string) => {
    setLoading(true)
    try {
      // Replace with your actual password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationResult = validatePassword(newPassword, confirmPassword)
    if (!validationResult.success) {
      // toast.error(validationResult.error)
      return
    }
    // Continue with password reset logic
    await forgetPassword(username, newPassword, followUp)
  }

  return (
    <Card className="w-[22rem] md:w-96 mx-auto  border-zinc-700">
      <CardHeader>
        <CardTitle className="text-xl text-center text-gray-300">
          Create New Password <span className="text-blue-500">college admin panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              className=" border-zinc-600 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="followUp" className="text-white">
              Who is your favorite superhero?
            </Label>
            <Input
              id="followUp"
              type="text"
              placeholder="Enter follow-up"
              className=" border-zinc-600 text-white"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className=" border-zinc-600 text-white pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className=" border-zinc-600 text-white pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Link
            href="/login"
            className="text-sm text-white hover:text-blue-400 hover:underline block"
          >
            Want to go to the login page?
          </Link>

          <Button
            type="submit"
            className="w-full bg-zinc-700 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
              </span>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ForgetPassword
