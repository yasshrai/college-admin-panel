"use client";

import useLogout from "@/app/hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <button
          onClick={logout}
          className="btn bg-indigo-900 hover:bg-indigo-700 cursor-pointer text-white"
        >
          Logout
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
