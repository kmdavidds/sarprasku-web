"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentIdentityStepProps {
  data: any
  onChange: (data: any) => void
}

export function StudentIdentityStep({ data, onChange }: StudentIdentityStepProps) {
  const handleInputChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Nama Lengkap *</Label>
          <Input
            id="fullName"
            placeholder="Contoh: Muhammad Alif"
            value={data.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="nim">NIM *</Label>
          <Input
            id="nim"
            placeholder="Contoh: 235150200111041"
            value={data.nim}
            onChange={(e) => handleInputChange("nim", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Student UB *</Label>
        <Input
          id="email"
          type="email"
          placeholder="Contoh: malif@student.ub.ac.id"
          value={data.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="studyProgram">Program Studi *</Label>
          <Select value={data.studyProgram} onValueChange={(value) => handleInputChange("studyProgram", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Pilih Prodi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teknik-informatika">Teknik Informatika</SelectItem>
              <SelectItem value="teknik-komputer">Teknik Komputer</SelectItem>
              <SelectItem value="sistem-informasi">Sistem Informasi</SelectItem>
              <SelectItem value="teknologi-informasi">Teknologi Informasi</SelectItem>
              <SelectItem value="pendidikan-teknologi-informasi">Pendidikan Teknologi Informasi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phoneNumber">No Hp Aktif *</Label>
          <Input
            id="phoneNumber"
            placeholder="Contoh: 087123456789"
            value={data.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}
