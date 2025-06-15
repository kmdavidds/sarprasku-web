"use client"

import { Home } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"

interface HeaderProps {
  isMobile?: boolean
}

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/ajukan-peminjaman": "Ajukan Peminjaman",
  "/lihat-pengajuan": "Lihat Pengajuan",
  "/faq": "FAQ",
}

export function Header({ isMobile = false }: HeaderProps) {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Dashboard"

  return (
    <header className={`bg-white ${!isMobile ? "border-b px-6 py-4" : ""} flex items-center justify-between`}>
      {!isMobile && (
        <div className="flex items-center">
          <Home className="mr-2 h-5 w-5 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
      )}

      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>PI</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Putu Indah Githa Cahyani</p>
                <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
