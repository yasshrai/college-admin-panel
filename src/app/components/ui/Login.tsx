"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import useLogin from "@/app/hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, login } = useLogin();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <Card className="w-[22rem] md:w-96 mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center ">
          Login <span className="text-blue-500">college admin panel</span>
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
              className=" text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className=" text-white pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="flex flex-col space-y-2">
            <Link
              href="/forgetpassword"
              className="text-sm text-white hover:text-blue-400 hover:underline self-start"
            >
              Forget Password?
            </Link>

            <Link href="/signup" className="text-sm text-white hover:text-blue-400 hover:underline self-start">
              Don&apos;t have account?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full hover:bg-blue-600 "
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
