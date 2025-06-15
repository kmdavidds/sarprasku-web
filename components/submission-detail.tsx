"use client"

import { ArrowLeft, Download, Check, X, MessageSquare, Calendar, MapPin, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface SubmissionDetailProps {
  submission: any
  onBack: () => void
}

export function SubmissionDetail({ submission, onBack }: SubmissionDetailProps) {
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

  const statusHistory = [
    {
      status: "Diajukan",
      date: "17/05/2025",
      time: "14:09",
      description: "Pengajuan peminjaman telah diterima dan sedang menunggu review",
    },
    {
      status: "Dalam Review",
      date: "18/05/2025",
      time: "09:00",
      description: "Pengajuan sedang direview oleh admin",
    },
  ]

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">Detail Pengajuan</h1>
          <p className="text-sm text-gray-600">ID: {submission.id}</p>
        </div>
        <div className="flex items-center space-x-2">{getStatusBadge(submission.status)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Informasi Kegiatan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Nama Kegiatan</Label>
                  <p className="text-sm font-medium">{submission.eventName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Organisasi</Label>
                  <p className="text-sm font-medium">{submission.organization}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Tanggal Pelaksanaan</Label>
                  <p className="text-sm font-medium">{submission.executionDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Waktu Pelaksanaan</Label>
                  <p className="text-sm font-medium">{submission.executionTime}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Deskripsi Kegiatan</Label>
                <p className="text-sm mt-1">
                  Workshop pengembangan web untuk mahasiswa FILKOM yang mencakup HTML, CSS, JavaScript, dan framework
                  modern. Kegiatan ini bertujuan untuk meningkatkan kemampuan teknis mahasiswa dalam bidang web
                  development.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Facility Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Informasi Sarana & Prasarana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Lokasi</Label>
                  <p className="text-sm font-medium">{submission.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Jenis</Label>
                  <p className="text-sm font-medium">{submission.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Kapasitas</Label>
                  <p className="text-sm font-medium">100 orang</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Jumlah Peserta</Label>
                  <p className="text-sm font-medium">50 orang</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Fasilitas Tambahan</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="secondary">Proyektor</Badge>
                  <Badge variant="secondary">Sound System</Badge>
                  <Badge variant="secondary">Whiteboard</Badge>
                  <Badge variant="secondary">Meja & Kursi</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Informasi Pemohon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Nama Lengkap</Label>
                  <p className="text-sm font-medium">{submission.studentName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Program Studi</Label>
                  <p className="text-sm font-medium">{submission.studentProgram}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">NIM</Label>
                  <p className="text-sm font-medium">235150200111041</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p className="text-sm font-medium">putu@student.ub.ac.id</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Dokumen Pendukung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-red-600">PDF</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Surat Peminjaman Ruangan.pdf</p>
                      <p className="text-xs text-gray-500">2.4 MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          {submission.status === "Pending" && (
            <Card>
              <CardHeader>
                <CardTitle>Tindakan Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adminNotes">Catatan (Opsional)</Label>
                  <Textarea id="adminNotes" placeholder="Tambahkan catatan untuk pemohon..." className="mt-1" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-green-600 hover:bg-green-700 flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Setujui Pengajuan
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Tolak Pengajuan
                  </Button>
                  <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Minta Revisi
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Riwayat Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      {index < statusHistory.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.status}</p>
                      <p className="text-xs text-gray-500">
                        {item.date} • {item.time}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tanggal Pengajuan:</span>
                <span className="font-medium">{submission.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Update Terakhir:</span>
                <span className="font-medium">{submission.lastUpdate}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Durasi Peminjaman:</span>
                <span className="font-medium">5 jam</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimasi Peserta:</span>
                <span className="font-medium">50 orang</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
