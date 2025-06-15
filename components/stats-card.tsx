import type { ReactNode } from "react"

interface StatsCardProps {
  count: number
  label: string
  iconBg: string
  icon: ReactNode
}

export function StatsCard({ count, label, iconBg, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${iconBg} flex items-center justify-center mr-3 md:mr-4`}
        >
          {icon}
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{count}</div>
          <div className="text-xs md:text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  )
}
