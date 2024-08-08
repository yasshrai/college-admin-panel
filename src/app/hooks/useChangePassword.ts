import { useState } from "react";
import toast from "react-hot-toast";
import { ChangePasswordInput } from "../components/form/ChangePasswordForm";
const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async (adminData: ChangePasswordInput) => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_PORT + "/api/admin/changepassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adminData),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("password change successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      return true;
    }
  };

  return { loading, changePassword };
};

export default useChangePassword;
