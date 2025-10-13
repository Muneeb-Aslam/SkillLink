"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Briefcase, UserCheck } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalClients: number;
  totalFreelancers: number;
  totalProjects: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalFreelancers: 0,
    totalProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your platform users and projects
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Clients Card */}
          <Link href="/admin/clients">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Clients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalClients}</div>
                <CardDescription className="text-xs text-muted-foreground">
                  Registered clients on the platform
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          {/* Freelancers Card */}
          <Link href="/admin/freelancers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Freelancers
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalFreelancers}
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                  Active freelancers on the platform
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          {/* Projects Card */}
          <Link href="/admin/projects">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <CardDescription className="text-xs text-muted-foreground">
                  Projects created on the platform
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/clients">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-medium text-gray-900">
                  Manage Clients
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  View and manage all client accounts
                </p>
              </div>
            </Link>
            <Link href="/admin/freelancers">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-medium text-gray-900">
                  Manage Freelancers
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  View and manage all freelancer accounts
                </p>
              </div>
            </Link>
            <Link href="/admin/projects">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="text-lg font-medium text-gray-900">
                  Manage Projects
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  View and manage all projects
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
