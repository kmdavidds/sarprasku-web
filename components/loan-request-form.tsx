"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StepIndicator } from "./step-indicator"
import { StudentIdentityStep } from "./form-steps/student-identity-step"
import { EventDetailsStep } from "./form-steps/event-details-step"
import { RequirementsStep } from "./form-steps/requirements-step"
import { DocumentUploadStep } from "./form-steps/document-upload-step"
import { postBorrowing } from "@/lib/pocketbase"

interface LoanRequestFormProps {
  selectedRoom: any
  onBack: () => void
}

export function LoanRequestForm({ selectedRoom, onBack }: LoanRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Student Identity
    fullName: "",
    nim: "",
    email: "",
    studyProgram: "",
    phoneNumber: "",
    // Event Details
    organizationName: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    participantCount: "",
    eventDescription: "",
    // Requirements
    additionalEquipment: [] as string[],
    specialRequests: "",
    // Documents
    documents: [] as File[],
  })

  const steps = [
    { number: 1, title: "Identitas Mahasiswa", subtitle: "Penanggung Jawab Kegiatan" },
    { number: 2, title: "Detail Acara", subtitle: "Rincian Acara & Organisasi" },
    { number: 3, title: "Kebutuhan", subtitle: "Sarana yang Diperlukan" },
    { number: 4, title: "Dokumen", subtitle: "Upload Persyaratan" },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      const submissionData = {
        location: selectedRoom.name,
        type: selectedRoom.type, 
        activity: formData.eventName,
        organization: formData.organizationName,
        date: `2025-06-30 14:00:00`,
        status: "Pending",
        participantCount: parseInt(formData.participantCount, 10) || 0,
        eventDescription: formData.eventDescription,
        specialRequests: formData.specialRequests,
        equipment: formData.additionalEquipment.join("&"),
        document: formData.documents[0]
      };

      postBorrowing(submissionData)
      onBack()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StudentIdentityStep data={formData} onChange={handleFormDataChange} />
      case 2:
        return <EventDetailsStep data={formData} onChange={handleFormDataChange} />
      case 3:
        return <RequirementsStep data={formData} onChange={handleFormDataChange} />
      case 4:
        return <DocumentUploadStep data={formData} onChange={handleFormDataChange} />
      default:
        return null
    }
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{selectedRoom.name}</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6 mb-6">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Langkah {currentStep}/4</div>
          <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
          <p className="text-sm text-gray-600">{steps[currentStep - 1].subtitle}</p>
        </div>

        {renderCurrentStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          {"< Sebelumnya"}
        </Button>
        <Button onClick={handleNext} className="bg-blue-900 hover:bg-blue-800">
          {currentStep === 4 ? "Submit" : "Selanjutnya >"}
        </Button>
      </div>
    </div>
  )
}
