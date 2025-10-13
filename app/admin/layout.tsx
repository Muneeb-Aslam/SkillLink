import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Users, UserCheck, Briefcase, Settings } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Link",
  description: "A Freelancing Web App",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full px-6 bg-primary-background font-Inter">
      {/* Admin Navigation */}
      <nav className="">
        <div className="">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="text-xl font-bold text-gray-900">
                  Admin Panel
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/clients"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Clients
                </Link>
                <Link
                  href="/admin/freelancers"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Freelancers
                </Link>
                <Link
                  href="/admin/projects"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <main>{children}</main>
    </div>
  );
}
