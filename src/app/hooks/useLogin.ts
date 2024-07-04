import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const login = async (username: String, password: String) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("admin", JSON.stringify(data));
      setAuthUser(data);
      toast.success("login successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;

function handleInputErrors(username: String, password: String) {
  if (!username || !password) {
    toast.error("enter all data");
    return false;
  }
  return true;
}
