"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { date, statusColor, time } from "@/lib/utils";

export function DataTable({ data }: any) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 md:p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Riwayat Pengajuan Peminjaman
        </h2>
        <p className="text-sm text-gray-600">
          Menampilkan {data.length} pengajuan
        </p>
      </div>

      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Pengajuan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sarana/Prasarana
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Kegiatan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Pelaksanaan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Update Terakhir
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item: any, index: any) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {date(item.created)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {time(item.created)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.location}
                  </div>
                  <div className="text-sm text-gray-500">{item.type}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.activity}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.organization}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {date(item.date)}
                  </div>
                  <div className="text-sm text-gray-500">{time(item.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={statusColor(item.status)}>{item.status}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {date(item.updated)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {time(item.updated)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Shown only on mobile */}
      <div className="md:hidden">
        {data.map((item: any, index: any) => (
          <div key={index} className="border-b last:border-b-0">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleRow(index)}
            >
              <div>
                <div className="font-medium">{item.activity}</div>
                <div className="text-sm text-gray-500">{item.organization}</div>
                <div className="mt-1 flex items-center">
                  <Badge className={statusColor(item.status)}>{item.status}</Badge>
                  <span className="ml-2 text-xs text-gray-500">
                    {date(item.created)} {time(item.created)}
                  </span>
                </div>
              </div>
              <div>
                {expandedRows.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {expandedRows.includes(index) && (
              <div className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Lokasi</div>
                    <div>{item.location}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Jenis</div>
                    <div>{item.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Tanggal Pelaksanaan</div>
                    <div>{date(item.date)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Waktu</div>
                    <div>{time(item.date)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Update Terakhir</div>
                    <div>
                      {date(item.updated)} {time(item.updated)}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Detail
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 md:px-6 md:py-4 border-t flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-500 order-2 md:order-1">
          Rows per page: 5
        </div>
        <div className="flex items-center space-x-4 order-1 md:order-2">
          <span className="text-sm text-gray-500">1-5 of 5</span>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
