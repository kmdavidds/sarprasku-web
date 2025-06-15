"use client"

import { Home, FileText, List, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface SidebarProps {
  onNavClick?: () => void
}

export function Sidebar({ onNavClick }: SidebarProps) {
  const pathname = usePathname()

  const handleNavClick = (path: string) => {
    if (onNavClick) onNavClick()
    window.location.href = path
  }

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      id: "ajukan-peminjaman",
      label: "Ajukan Peminjaman",
      icon: FileText,
      path: "/ajukan-peminjaman",
    },
    {
      id: "lihat-pengajuan",
      label: "Lihat Pengajuan",
      icon: List,
      path: "/lihat-pengajuan",
    },
    {
      id: "faq",
      label: "FAQ",
      icon: HelpCircle,
      path: "/faq",
    },
  ]

  return (
    <div className="h-full bg-blue-900 text-white flex flex-col">
      <div className="p-4 lg:p-6">
        <div className="text-sm text-blue-200 mb-1">Layanan Sarana Prasarana</div>
        <div className="text-xl lg:text-2xl font-bold">SARPRASKU</div>
      </div>

      <nav className="flex-1 px-2 lg:px-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-white text-blue-900 hover:bg-gray-100" : "text-white hover:bg-blue-800"
                }`}
                onClick={() => handleNavClick(item.path)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
