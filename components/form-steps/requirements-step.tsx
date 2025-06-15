"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface RequirementsStepProps {
  data: any
  onChange: (data: any) => void
}

export function RequirementsStep({ data, onChange }: RequirementsStepProps) {
  const equipmentOptions = [
    "Sound System",
    "Whiteboard",
    "Kabel roll",
    "Proyektor",
    "Meja",
    "Toa",
    "Kursi",
    "Microphone",
  ]

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    const currentEquipment = data.additionalEquipment || []
    if (checked) {
      onChange({ additionalEquipment: [...currentEquipment, equipment] })
    } else {
      onChange({ additionalEquipment: currentEquipment.filter((item: string) => item !== equipment) })
    }
  }

  const handleSpecialRequestsChange = (value: string) => {
    onChange({ specialRequests: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Sarana Tambahan</Label>
        <p className="text-sm text-gray-600 mb-4">Pilih sarana yang diperlukan (opsional)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {equipmentOptions.map((equipment) => (
            <div key={equipment} className="flex items-center space-x-2">
              <Checkbox
                id={equipment}
                checked={(data.additionalEquipment || []).includes(equipment)}
                onCheckedChange={(checked) => handleEquipmentChange(equipment, checked as boolean)}
              />
              <Label htmlFor={equipment} className="text-sm font-normal">
                {equipment}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="specialRequests">Permintaan Khusus</Label>
        <Textarea
          id="specialRequests"
          placeholder="Jelaskan jika ada permintaan khusus, catatan tambahan, atau sarana tambahan lain yang diperlukan"
          value={data.specialRequests}
          onChange={(e) => handleSpecialRequestsChange(e.target.value)}
          className="mt-1 min-h-[100px]"
        />
      </div>
    </div>
  )
}
