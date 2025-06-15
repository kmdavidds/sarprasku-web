"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (status: string) => void
}

export function SearchFilter({ onSearch, onFilter }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilter = (value: string) => {
    setStatusFilter(value)
    onFilter(value)
  }

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari berdasarkan nama, organisasi, kegiatan, dll..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="disetujui">Disetujui</SelectItem>
            <SelectItem value="pending">Menunggu Review</SelectItem>
            <SelectItem value="revisi">Perlu Revisi</SelectItem>
            <SelectItem value="ditolak">Ditolak</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
