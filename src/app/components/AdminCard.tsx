import React from "react";

interface Admin {
  name: string;
  username: string;
  email: string;
}

const AdminCard: React.FC<{ admin: Admin }> = ({ admin }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-4 flex flex-col lg:flex-row">
      <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
        <h2 className="text-2xl font-semibold text-blue-500">{admin.name}</h2>
      </div>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-300">
          <strong>Username:</strong> {admin.username}
        </p>
        <p className="text-gray-300">
          <strong>Email:</strong> {admin.email}
        </p>
      </div>
    </div>
  );
};

export default AdminCard;
