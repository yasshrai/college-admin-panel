import { Card, CardContent } from "@/components/ui/card"

interface Admin {
  name: string
  username: string
  email: string
}

const AdminCard = ({ admin }: { admin: Admin }) => {
  return (
    <Card className="mb-4 overflow-hidden bg-card">
      <CardContent className="flex flex-col gap-4 p-6 lg:flex-row">
        <div className="flex-shrink-0 mb-2 lg:mb-0 lg:mr-4">
          <h2 className="text-2xl font-semibold text-primary">{admin.name}</h2>
        </div>
        <div className="flex-grow grid grid-cols-1 gap-4 md:grid-cols-2">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Username:</strong> {admin.username}
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Email:</strong> {admin.email}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminCard
