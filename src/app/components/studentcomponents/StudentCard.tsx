import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Student {
  name: string
  branch: string
  department?: string
  rollNumber?: string
  scholarNumber?: string
  enrollmentNumber?: string
  admissionYear?: number
  leaveUniversity?: boolean
  passOutYear?: number
  mobileNumber?: string
  emailAddress?: string
  fatherName?: string
  motherName?: string
  residenceAddress?: string
  parentContectNumber?: string
  semester?: string
  section?: string
  subjectinHighSchool?: string
  regular?: boolean
  busFacility?: boolean
  achivements?: string
}

const StudentCard = ({ student }: { student: Student }) => {
  return (
    <Card className=" border-zinc-700">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
            <h2 className="text-2xl font-semibold text-blue-500">{student.name}</h2>
            {student.leaveUniversity && (
              <Badge variant="destructive" className="mt-2">
                Left University
              </Badge>
            )}
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-300">
              <strong className="font-bold">Branch:</strong> {student.branch}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Department:</strong> {student.department}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Roll Number:</strong> {student.rollNumber}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Scholar Number:</strong> {student.scholarNumber}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Enrollment Number:</strong> {student.enrollmentNumber}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Admission Year:</strong> {student.admissionYear}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Pass Out Year:</strong> {student.passOutYear}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Mobile Number:</strong> {student.mobileNumber}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Email Address:</strong> {student.emailAddress}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Father Name:</strong> {student.fatherName}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Mother Name:</strong> {student.motherName}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Residence Address:</strong> {student.residenceAddress}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Parent Contact Number:</strong> {student.parentContectNumber}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Semester:</strong> {student.semester}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Section:</strong> {student.section}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Subject in High School:</strong> {student.subjectinHighSchool}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Regular:</strong> {student.regular ? "Yes" : "No"}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Bus Facility:</strong> {student.busFacility ? "Yes" : "No"}
            </p>
            <p className="text-gray-300">
              <strong className="font-bold">Achievements:</strong> {student.achivements}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StudentCard
