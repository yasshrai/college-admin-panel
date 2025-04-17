
import Home from "./components/ui/Home"
import AdminSidebar from "./components/ui/Sidebar"


export default function AdminPanel() {
  return (
    <main className="h-screen overflow-hidden flex flex-col">
      <div className="h-16 shrink-0">
        <Home /> {/* Navbar, fixed height */}
      </div>
      <div className="flex-1 overflow-hidden">
        <AdminSidebar />
      </div>
    </main>
  )
}
