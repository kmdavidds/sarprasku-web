"use client"

import { useState } from "react"
import { Search, Calendar, Clock, Users, MapPin, AlertTriangle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function RoomSelection({ onRoomSelect, rooms }: any) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [participants, setParticipants] = useState("")
  const [showRooms, setShowRooms] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleCheckAvailability = () => {
    // Validate form inputs
    if (!selectedDate || !startTime || !endTime || !participants) {
      setHasSearched(true)
      setShowRooms(false)
      return
    }

    // If all fields are filled, show rooms
    setHasSearched(true)
    setShowRooms(true)
  }

  const getStatusBadge = (status: string, pendingCount?: number) => {
    switch (status) {
      case "available":
        return <Badge className="bg-gray-800 text-white hover:bg-gray-700">Tersedia</Badge>
      case "pending":
        return <Badge variant="outline">{pendingCount} pending</Badge>
      case "unavailable":
        return <Badge variant="destructive">Tidak tersedia</Badge>
      default:
        return null
    }
  }

  const getActionButton = (room: any) => {
    if (room.status === "available") {
      return (
        <Button className="w-full bg-blue-900 hover:bg-blue-800" onClick={() => onRoomSelect(room)}>
          Ajukan Peminjaman
        </Button>
      )
    } else if (room.status === "pending") {
      return (
        <Button variant="outline" className="w-full" onClick={() => onRoomSelect(room)}>
          Ajukan Peminjaman
        </Button>
      )
    } else {
      return (
        <Button variant="outline" className="w-full" disabled>
          Ajukan Peminjaman
        </Button>
      )
    }
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Ajukan Peminjaman</h1>
      </div>

      {/* Date and Time Selection */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Tanggal</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Pukul</label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-10"
                    placeholder="00:00"
                  />
                </div>
                <span className="text-sm text-gray-500">—</span>
                <div className="relative flex-1">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-10"
                    placeholder="00:00"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Jumlah Peserta</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                <Input
                  type="number"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="pl-10"
                  placeholder="0"
                  min="1"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-blue-900 hover:bg-blue-800" onClick={handleCheckAvailability}>
                Cek Ketersediaan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State or Room List */}
      {!showRooms && hasSearched && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Data tidak tersedia</h3>
          <p className="text-gray-600">Silakan masukkan format tanggal dan waktu yang benar</p>
        </div>
      )}

      {!hasSearched && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Data tidak tersedia</h3>
          <p className="text-gray-600">Silakan masukkan format tanggal dan waktu yang benar</p>
        </div>
      )}

      {/* Search and Filter - Only show when rooms are displayed */}
      {showRooms && (
        <>
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari sarana dan prasarana..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Filter</SelectItem>
                    <SelectItem value="available">Tersedia</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Room List */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilih Sarana dan Prasarana</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((room: any) => (
                <Card key={room.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{room.name}</h3>
                        <p className="text-sm text-gray-600">{room.type}</p>
                      </div>
                      {getStatusBadge(room.status, room.pendingCount)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        Kapasitas: {room.capacity} orang
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {room.floor}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {room.equipment.split("&").map((item: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                          {item.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {room.status === "pending" && room.pendingCount && room.pendingCount > 0 && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                          <p className="text-xs text-yellow-800">
                            Info: Ada {room.pendingCount} pengajuan lain untuk ruangan ini di jadwal yang sama.
                            Permohonan Anda akan diproses setelah pengajuan tersebut selesai direview.
                          </p>
                        </div>
                      </div>
                    )}

                    {getActionButton(room)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
