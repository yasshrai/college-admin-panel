import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    name,
    username,
    password,
    confirmPassword,
    email,
  }: any) => {
    const success = handleInputErrors({
      name,
      username,
      password,
      confirmPassword,
      email,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          password,
          email,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("admin", JSON.stringify(data));
      setAuthUser(data);
      toast.success("admin created successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function containsNumber(str: any) {
  for (let char of str) {
    if (!isNaN(parseInt(char))) {
      return true;
    }
  }
  return false;
}

function handleInputErrors({
  name,
  username,
  password,
  confirmPassword,
  email,
}: any) {
  if (!name || !username || !password || !confirmPassword || !email) {
    toast.error("enter all fields");
    return false;
  }
  if (password.length < 7) {
    toast.error("password should be bigger than 7 character");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("password is not similar");
    return false;
  }
  if (containsNumber(name)) {
    toast.error("name does not contain number ");
    return false;
  }
  return true;
}
