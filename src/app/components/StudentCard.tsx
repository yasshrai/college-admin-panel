import React from "react";

interface Student {
  name: string;
  branch: string;
  department?: string;
  rollNumber?: string;
  scholarNumber?: string;
  enrollmentNumber?: string;
  admissionYear?: number;
  leaveUniversity?: boolean;
  passOutYear?: number;
  mobileNumber?: string;
  emailAddress?: string;
  fatherName?: string;
  motherName?: string;
  residenceAddress?: string;
  parentContectNumber?: string;
  semester?: string;
  section?: string;
  subjectinHighSchool?: string;
  regular?: boolean;
  busFacility?: boolean;
  achivements?: string;
}

const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-4 flex flex-col lg:flex-row">
      <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
        <h2 className="text-2xl font-semibold text-blue-500">{student.name}</h2>
        {student.leaveUniversity && (
          <p className="text-red-500">Left University ❌</p>
        )}
      </div>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-300">
          <strong>Branch:</strong> {student.branch}
        </p>
        <p className="text-gray-300">
          <strong>Department:</strong> {student.department}
        </p>
        <p className="text-gray-300">
          <strong>Roll Number:</strong> {student.rollNumber}
        </p>
        <p className="text-gray-300">
          <strong>Scholar Number:</strong> {student.scholarNumber}
        </p>
        <p className="text-gray-300">
          <strong>Enrollment Number:</strong> {student.enrollmentNumber}
        </p>
        <p className="text-gray-300">
          <strong>Admission Year:</strong> {student.admissionYear}
        </p>
        <p className="text-gray-300">
          <strong>Pass Out Year:</strong> {student.passOutYear}
        </p>
        <p className="text-gray-300">
          <strong>Mobile Number:</strong> {student.mobileNumber}
        </p>
        <p className="text-gray-300">
          <strong>Email Address:</strong> {student.emailAddress}
        </p>
        <p className="text-gray-300">
          <strong>Father Name:</strong> {student.fatherName}
        </p>
        <p className="text-gray-300">
          <strong>Mother Name:</strong> {student.motherName}
        </p>
        <p className="text-gray-300">
          <strong>Residence Address:</strong> {student.residenceAddress}
        </p>
        <p className="text-gray-300">
          <strong>Parent Contact Number:</strong> {student.parentContectNumber}
        </p>
        <p className="text-gray-300">
          <strong>Semester:</strong> {student.semester}
        </p>
        <p className="text-gray-300">
          <strong>Section:</strong> {student.section}
        </p>
        <p className="text-gray-300">
          <strong>Subject in High School:</strong> {student.subjectinHighSchool}
        </p>
        <p className="text-gray-300">
          <strong>Regular:</strong> {student.regular ? "Yes" : "No"}
        </p>
        <p className="text-gray-300">
          <strong>Bus Facility:</strong> {student.busFacility ? "Yes" : "No"}
        </p>
        <p className="text-gray-300">
          <strong>Achievements:</strong> {student.achivements}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
