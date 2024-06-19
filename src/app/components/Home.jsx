"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/authContext";
import LogoutButton from "./Logoutbutton";
import { useEffect } from "react";
const Home = () => {
  const { authUser } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    }
  }, [authUser, router]);

  return (
    <div>
      <h1>Redirecting</h1>
      <LogoutButton></LogoutButton>
    </div>
  );
};

export default Home;
