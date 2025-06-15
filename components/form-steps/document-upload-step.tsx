"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface DocumentUploadStepProps {
  data: any
  onChange: (data: any) => void
}

export function DocumentUploadStep({ data, onChange }: DocumentUploadStepProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      onChange({ documents: [...(data.documents || []), ...files] })
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onChange({ documents: [...(data.documents || []), ...files] })
    }
  }

  const removeFile = (index: number) => {
    const newDocuments = (data.documents || []).filter((_: any, i: number) => i !== index)
    onChange({ documents: newDocuments })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">File Surat Peminjaman Tempat *</Label>
        <p className="text-sm text-gray-600 mb-4">
          Surat sudah dilengkapi dengan nomor surat dari lembaga masing-masing
        </p>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Upload Dokumen</p>
          <p className="text-sm text-gray-600 mb-4">Drag and drop files here or click to browse</p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button variant="outline" asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose Files
            </label>
          </Button>
        </div>

        {data.documents && data.documents.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.documents.map((file: File, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-blue-800">
          💡 Tip: Pastikan dokumen sesuai dengan persyaratan. Cek halaman{" "}
          <span className="font-medium text-blue-900 underline cursor-pointer">FAQ</span> untuk memeriksa syarat dan
          ketentuan dokumen.
        </p>
      </div>
    </div>
  )
}
