import { useState } from "react";
import Link from "next/link";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (username: String, password: String) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;

function handleInputErrors(username: String, password: String) {
  if (!username || !password) {
    return false;
  }
  return true;
}
