import { Card, CardContent } from "@/components/ui/card"

interface Professor {
  name: string
  age: number
  department: string
  position: string
  professorId: string
  mobileNumber: string
  emailAddress: string
  residenceAddress: string
}

const ProfessorCard = ({ professor }: { professor: Professor }) => {
  return (
    <Card className="border-zinc-700">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-4">
            <h2 className="text-2xl font-semibold text-blue-500">{professor.name}</h2>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-300">
              <strong>Age:</strong> {professor.age}
            </p>
            <p className="text-gray-300">
              <strong>Department:</strong> {professor.department}
            </p>
            <p className="text-gray-300">
              <strong>Position:</strong> {professor.position}
            </p>
            <p className="text-gray-300">
              <strong>Professor ID:</strong> {professor.professorId}
            </p>
            <p className="text-gray-300">
              <strong>Mobile Number:</strong> {professor.mobileNumber}
            </p>
            <p className="text-gray-300">
              <strong>Email Address:</strong> {professor.emailAddress}
            </p>
            <p className="text-gray-300">
              <strong>Residence Address:</strong> {professor.residenceAddress}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfessorCard
