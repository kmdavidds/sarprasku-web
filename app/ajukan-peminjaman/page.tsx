"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { RoomSelection } from "@/components/room-selection"
import { LoanRequestForm } from "@/components/loan-request-form"
import { NavigationProvider } from "@/contexts/navigation-context"
import { RecordModel } from "pocketbase"
import { getFacilities } from "@/lib/pocketbase"
import { Spinner } from "@/components/spinner"

function AjukanPeminjamanContent({rooms}: any) {
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room)
    setShowForm(true)
  }

  const handleBackToRooms = () => {
    setShowForm(false)
    setSelectedRoom(null)
  }

  return (
    <Layout>
      {!showForm ? (
        <RoomSelection onRoomSelect={handleRoomSelect} rooms={rooms}/>
      ) : (
        <LoanRequestForm selectedRoom={selectedRoom} onBack={handleBackToRooms} />
      )}
    </Layout>
  )
}

export default function AjukanPeminjaman() {
  const [data, setData] = useState<RecordModel[]>([]);
  const [isLoading, setLoading] = useState(true);

  getFacilities().then((data) => {
    setData(data);
    setLoading(false);
  });

  if (isLoading) return <Spinner />;

  return (
    <NavigationProvider>
      <AjukanPeminjamanContent rooms={data} />
    </NavigationProvider>
  )
}
