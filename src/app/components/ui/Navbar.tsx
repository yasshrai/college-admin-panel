"use client"
import Image from "next/image"
import { User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuthContext } from "../../context/authContext"
import LogoutButton from "./Logoutbutton"
import renaissancelogo from "@/assets/renaissancelogo.png"
const Navbar = () => {
  const { authUser } = useAuthContext()

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center justify-between w-full px-4">
        {authUser?.logo && (
          <div className="ml-auto">
            <Image
              src={renaissancelogo}
              height={40}
              width={40}
              alt="College logo"
              className="h-10 w-10"
            />
          </div>
        )}
      </div>


      <div className="flex items-center gap-4">
        {authUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt={authUser.username} />
                  <AvatarFallback>{authUser.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">{authUser.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <strong className="mr-2">Full name:</strong> {authUser.name}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <strong className="mr-2">Email:</strong> {authUser.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default Navbar
