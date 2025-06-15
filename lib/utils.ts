import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function date(datetime: any) {
    return new Date(datetime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export function time(datetime: any) {
    return new Date(datetime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

export function statusColor(status: string): string {
    switch (status) {
        case "Revisi":
            return "bg-orange-100 text-orange-800";
        case "Pending":
            return "bg-purple-100 text-purple-800";
        case "Disetujui":
            return "bg-green-100 text-green-800";
        case "Ditolak":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}