"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Submission {
  id: string
  date: string
  time: string
  studentName: string
  studentProgram: string
  location: string
  type: string
  eventName: string
  organization: string
  executionDate: string
  executionTime: string
  status: "Pending" | "Disetujui" | "Ditolak" | "Revisi"
  lastUpdate: string
  updateTime: string
}

const submissionsData: Submission[] = [
  {
    id: "1",
    date: "17/05/2025",
    time: "14.09",
    studentName: "Putu Indah Githa Cahyani",
    studentProgram: "Teknik Informatika",
    location: "GKM 4.1",
    type: "Prasarana",
    eventName: "Workshop Web Development",
    organization: "BCC FILKOM",
    executionDate: "31/05/2025",
    executionTime: "09.00 - 14.00",
    status: "Pending",
    lastUpdate: "18/05/2025",
    updateTime: "09.01",
  },
  {
    id: "2",
    date: "17/05/2025",
    time: "14.09",
    studentName: "Aero Nathanael Silalahi",
    studentProgram: "Teknik Informatika",
    location: "GKM 4.2",
    type: "Prasarana",
    eventName: "Workshop Information Security",
    organization: "POROS",
    executionDate: "31/05/2025",
    executionTime: "09.00 - 14.00",
    status: "Disetujui",
    lastUpdate: "18/05/2025",
    updateTime: "09.01",
  },
  {
    id: "3",
    date: "10/05/2025",
    time: "14.09",
    studentName: "Komang David Dananjaya Suartana",
    studentProgram: "Teknik Informatika",
    location: "GKM 4.1",
    type: "Prasarana",
    eventName: "Workshop Back End",
    organization: "BCC FILKOM",
    executionDate: "24/05/2025",
    executionTime: "09.00 - 14.00",
    status: "Ditolak",
    lastUpdate: "18/05/2025",
    updateTime: "09.01",
  },
  {
    id: "4",
    date: "03/05/2025",
    time: "14.09",
    studentName: "Sayyidah Fatimah Azzahra",
    studentProgram: "Teknik Informatika",
    location: "GKM 4.2",
    type: "Prasarana",
    eventName: "Workshop Data Science",
    organization: "BCC FILKOM",
    executionDate: "17/05/2025",
    executionTime: "09.00 - 14.00",
    status: "Disetujui",
    lastUpdate: "18/05/2025",
    updateTime: "09.01",
  },
  {
    id: "5",
    date: "03/05/2025",
    time: "14.09",
    studentName: "Maudy Ayunda",
    studentProgram: "Teknik Informatika",
    location: "GKM 4.1",
    type: "Prasarana",
    eventName: "Rapat Besar Kemahasiswaan",
    organization: "BEM FILKOM",
    executionDate: "17/05/2025",
    executionTime: "09.00 - 14.00",
    status: "Disetujui",
    lastUpdate: "18/05/2025",
    updateTime: "09.01",
  },
]

interface SubmissionsListProps {
  onViewDetail: (submission: Submission) => void
}

export function SubmissionsList({ onViewDetail }: SubmissionsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [filteredData, setFilteredData] = useState(submissionsData)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-purple-100 text-purple-800">Pending</Badge>
      case "Disetujui":
        return <Badge className="bg-green-100 text-green-800">Disetujui</Badge>
      case "Ditolak":
        return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>
      case "Revisi":
        return <Badge className="bg-orange-100 text-orange-800">Revisi</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleSearch = () => {
    let filtered = submissionsData

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.studentName.toLowerCase().includes(lowercaseQuery) ||
          item.organization.toLowerCase().includes(lowercaseQuery) ||
          item.eventName.toLowerCase().includes(lowercaseQuery) ||
          item.location.toLowerCase().includes(lowercaseQuery),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status.toLowerCase() === statusFilter.toLowerCase())
    }

    setFilteredData(filtered)
  }

  return (
    <div className="p-4 md:p-6">
      {/* Page Title - Mobile Only */}
      <div className="lg:hidden mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Lihat Pengajuan</h1>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari berdasarkan nama, organisasi, kegiatan, dll..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="disetujui">Disetujui</SelectItem>
                <SelectItem value="ditolak">Ditolak</SelectItem>
                <SelectItem value="revisi">Revisi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Tanggal</SelectItem>
                <SelectItem value="name">Nama</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="bg-blue-900 hover:bg-blue-800">
              Cari
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 md:p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Respons Formulir Pengajuan</h2>
            <p className="text-sm text-gray-600">Daftar pengajuan dari seluruh mahasiswa</p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Pengajuan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Mahasiswa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sarana/Prasarana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Kegiatan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Pelaksanaan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update Terakhir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.date}</div>
                      <div className="text-sm text-gray-500">{submission.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                      <div className="text-sm text-gray-500">{submission.studentProgram}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.location}</div>
                      <div className="text-sm text-gray-500">{submission.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{submission.eventName}</div>
                      <div className="text-sm text-gray-500">{submission.organization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.executionDate}</div>
                      <div className="text-sm text-gray-500">{submission.executionTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(submission.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.lastUpdate}</div>
                      <div className="text-sm text-gray-500">{submission.updateTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="outline" size="sm" onClick={() => onViewDetail(submission)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {filteredData.map((submission) => (
              <div key={submission.id} className="border-b last:border-b-0 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{submission.eventName}</div>
                    <div className="text-sm text-gray-500">{submission.organization}</div>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pemohon:</span>
                    <span className="font-medium">{submission.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lokasi:</span>
                    <span>{submission.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tanggal:</span>
                    <span>{submission.executionDate}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => onViewDetail(submission)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Lihat Detail
                </Button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 md:px-6 md:py-4 border-t flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-500 order-2 md:order-1">Rows per page: 5</div>
            <div className="flex items-center space-x-4 order-1 md:order-2">
              <span className="text-sm text-gray-500">1-5 of 5</span>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
