import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomeMessage() {
  return (
    <div className="flex h-[85vh] w-full items-center justify-center p-6 md:h-[89vh]">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Welcome to the Admin Panel</CardTitle>
          <CardDescription>Select an option from the sidebar to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This admin panel allows you to manage students, professors, and admin accounts. Use the sidebar navigation
            to access different sections and features.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
