"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { NavigationProvider } from "@/contexts/navigation-context"
import { SubmissionsList } from "@/components/submissions-list"
import { SubmissionDetail } from "@/components/submission-detail"

function LihatPengajuanContent() {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleViewDetail = (submission: any) => {
    setSelectedSubmission(submission)
    setShowDetail(true)
  }

  const handleBackToList = () => {
    setShowDetail(false)
    setSelectedSubmission(null)
  }

  return (
    <Layout>
      {!showDetail ? (
        <SubmissionsList onViewDetail={handleViewDetail} />
      ) : (
        <SubmissionDetail submission={selectedSubmission} onBack={handleBackToList} />
      )}
    </Layout>
  )
}

export default function LihatPengajuan() {
  return (
    <NavigationProvider>
      <LihatPengajuanContent />
    </NavigationProvider>
  )
}
