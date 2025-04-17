import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Hash, Mail, Phone, MapPin, Calendar, Users, BookMarked, Bus, Award, CheckCircle, XCircle, BookText } from 'lucide-react'

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
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Card className="border-border overflow-auto">
      <CardContent className="p-4 sm:p-6 overflow-auto">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Header section - stacks on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 justify-center sm:justify-start">
                <h2 className="text-xl sm:text-2xl font-bold text-primary">{student.name}</h2>
                {student.leaveUniversity && (
                  <Badge variant="destructive" className="ml-0 sm:ml-2">
                    Left University
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                {student.branch} {student.department && `• ${student.department}`}
              </p>
            </div>
          </div>

          <Separator />

          {/* Information grid - single column on mobile, two columns on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Academic Information */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Hash className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Scholar Number</p>
                <p className="font-medium truncate">{student.scholarNumber || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Hash className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Roll Number</p>
                <p className="font-medium truncate">{student.rollNumber || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Hash className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Enrollment Number</p>
                <p className="font-medium truncate">{student.enrollmentNumber || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium truncate">{student.department || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Admission Year</p>
                <p className="font-medium">{student.admissionYear || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Pass Out Year</p>
                <p className="font-medium">{student.passOutYear || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <BookMarked className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="font-medium">{student.semester || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <BookText className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Section</p>
                <p className="font-medium">{student.section || "N/A"}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Mobile Number</p>
                <p className="font-medium truncate">{student.mobileNumber || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium truncate">{student.emailAddress || "N/A"}</p>
              </div>
            </div>

            {/* Family Information */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Father's Name</p>
                <p className="font-medium truncate">{student.fatherName || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Mother's Name</p>
                <p className="font-medium truncate">{student.motherName || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Parent Contact</p>
                <p className="font-medium truncate">{student.parentContectNumber || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mt-0.5">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Residence Address</p>
                <p className="font-medium break-words">{student.residenceAddress || "N/A"}</p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mt-0.5">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">High School Subjects</p>
                <p className="font-medium break-words">{student.subjectinHighSchool || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mt-0.5">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="font-medium break-words">{student.achivements || "None"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                {student.regular ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Regular Student</p>
                <p className="font-medium">{student.regular ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Bus className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">Bus Facility</p>
                <p className="font-medium">{student.busFacility ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StudentCard
