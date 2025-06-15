"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock } from "lucide-react"

interface EventDetailsStepProps {
  data: any
  onChange: (data: any) => void
}

export function EventDetailsStep({ data, onChange }: EventDetailsStepProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organizationName">Nama Organisasi Penyelenggara *</Label>
          <Input
            id="organizationName"
            placeholder="Contoh: BCC FILKOM"
            value={data.organizationName}
            onChange={(e) => handleInputChange("organizationName", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="eventName">Nama Kegiatan *</Label>
          <Input
            id="eventName"
            placeholder="Contoh: Workshop Web Development"
            value={data.eventName}
            onChange={(e) => handleInputChange("eventName", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eventDateTime">Tanggal & Waktu Pelaksanaan *</Label>
          <div className="mt-1 p-3 border rounded-md bg-gray-50">
            <div className="text-sm font-medium">Monday, May 26 · 09:00-12:00</div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Jadwal tersedia
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="participantCount">Jumlah Peserta *</Label>
          <Input
            id="participantCount"
            placeholder="50"
            value={data.participantCount}
            onChange={(e) => handleInputChange("participantCount", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="eventDescription">Rincian Kegiatan *</Label>
        <Textarea
          id="eventDescription"
          placeholder="Deskripsi singkat dari kegiatan yang akan dilaksanakan"
          value={data.eventDescription}
          onChange={(e) => handleInputChange("eventDescription", e.target.value)}
          className="mt-1 min-h-[100px]"
        />
      </div>
    </div>
  )
}
