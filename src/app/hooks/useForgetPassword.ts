import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const forgetPassword = async (
    username: string,
    newPassword: string,
    followUp: string
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_PORT + "/api/admin/forgetpassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, newPassword, followUp }),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("password change successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      return true;
    }
  };
  return { loading, forgetPassword };
};

export default useForgetPassword;
