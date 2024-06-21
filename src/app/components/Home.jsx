"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/authContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
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
      <Navbar></Navbar>
    </div>
  );
};

export default Home;
