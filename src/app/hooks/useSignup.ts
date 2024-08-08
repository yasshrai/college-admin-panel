import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserDetails {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  followUp: string;
}
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = async ({
    name,
    username,
    password,
    confirmPassword,
    email,
    followUp,
  }: UserDetails) => {
    const success = handleInputErrors({
      name,
      username,
      password,
      confirmPassword,
      email,
      followUp,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_PORT + "/api/admin/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            username,
            password,
            email,
            followUp,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("admin created successfully");
      router.push("/login");
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
  followUp,
}: UserDetails) {
  if (
    !name ||
    !username ||
    !password ||
    !confirmPassword ||
    !email ||
    !followUp
  ) {
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
