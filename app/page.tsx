"use client";

import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { StatsCard } from "@/components/stats-card";
import { SearchFilter } from "@/components/search-filter";
import { DataTable } from "@/components/data-table";
import { NavigationProvider } from "@/contexts/navigation-context";
import { getBorrowings } from "@/lib/pocketbase";
import { statsData } from "@/components/stats-data";

function DashboardContent({ data }: any) {
  const [filteredData, setFilteredData] = useState(data);
  statsData.forEach((stat) => {
    const statusMap: Record<string, string> = {
      Disetujui: "disetujui",
      "Menunggu Review": "pending",
      "Perlu Revisi": "revisi",
      Ditolak: "ditolak",
    };

    const statusKey = statusMap[stat.label];
    if (statusKey) {
      stat.count = data.filter(
        (item: any) => item.status.toLowerCase() === statusKey
      ).length;
    }
  });

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredData(data);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = data.filter(
      (item: any) =>
        item.activity.toLowerCase().includes(lowercaseQuery) ||
        item.organization.toLowerCase().includes(lowercaseQuery) ||
        item.location.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredData(filtered);
  };

  const handleFilter = (status: string) => {
    if (status === "all") {
      setFilteredData(data);
      return;
    }

    const statusMap: Record<string, string> = {
      disetujui: "Disetujui",
      pending: "Pending",
      revisi: "Revisi",
      ditolak: "Ditolak",
    };

    const filtered = data.filter(
      (item: any) => item.status === statusMap[status]
    );

    setFilteredData(filtered);
  };

  return (
    <Layout>
      <div className="p-4 md:p-6">
        {/* Page Title - Mobile Only */}
        <div className="lg:hidden mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              count={stat.count}
              label={stat.label}
              iconBg={stat.iconBg}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Search and Filter */}
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

        {/* Data Table */}
        <DataTable data={filteredData} />
      </div>
    </Layout>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<RecordModel[]>([]);
  const [isLoading, setLoading] = useState(true);

  getBorrowings().then((data) => {
    setData(data);
    setLoading(false);
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <NavigationProvider>
      <DashboardContent data={data} />
    </NavigationProvider>
  );
}
