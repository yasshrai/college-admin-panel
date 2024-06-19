import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/admin/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("admin");
      setAuthUser(null);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;
