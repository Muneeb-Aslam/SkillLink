"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { ToastContainer } from "@/components/ui/toast";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface Freelancer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  position: string;
  skills: string[];
  bids: number;
  amount: number;
  createdAt: string;
}

export default function AdminFreelancers() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    freelancerId: string | null;
    freelancerName: string;
  }>({
    isOpen: false,
    freelancerId: null,
    freelancerName: "",
  });
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      type: "success" | "error" | "warning";
      title: string;
      description?: string;
    }>
  >([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await fetch("/api/admin/freelancers");
        if (response.ok) {
          const data = await response.json();
          setFreelancers(data);
        }
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const handleDeleteClick = (freelancerId: string, freelancerName: string) => {
    setDeleteModal({
      isOpen: true,
      freelancerId,
      freelancerName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.freelancerId) return;

    try {
      const response = await fetch(
        `/api/admin/freelancers/${deleteModal.freelancerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFreelancers(
          freelancers.filter(
            (freelancer) => freelancer._id !== deleteModal.freelancerId
          )
        );
        setDeleteModal({
          isOpen: false,
          freelancerId: null,
          freelancerName: "",
        });
        addToast(
          "success",
          "Freelancer deleted successfully",
          "The freelancer has been removed from the platform."
        );
      } else {
        addToast(
          "error",
          "Failed to delete freelancer",
          "Please try again later."
        );
      }
    } catch (error) {
      console.error("Error deleting freelancer:", error);
      addToast(
        "error",
        "Error deleting freelancer",
        "An unexpected error occurred."
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, freelancerId: null, freelancerName: "" });
  };

  const addToast = (
    type: "success" | "error" | "warning",
    title: string,
    description?: string
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1500px] mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-blue">
                  Freelancers Management
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Manage all freelancer accounts on the platform
                </p>
              </div>
              <Link href="/admin">
                <Button variant="secondary">Back to Dashboard</Button>
              </Link>
            </div>
          </div>

          <Card className="bg-light-orange shadow-lg rounded-lg border-[1.5px] border-[#f8f4f4f1]">
            <CardHeader>
              <CardTitle>All Freelancers ({freelancers.length})</CardTitle>
              <CardDescription>
                A list of all registered freelancers on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-input">
                <Table className="border-[1.5px] border-input">
                  <TableHeader>
                    <TableRow className="border-[1.5px] border-input text-blue">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {freelancers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={10}
                          className="text-center py-8 text-gray-500"
                        >
                          No freelancers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      freelancers.map((freelancer) => (
                        <TableRow
                          key={freelancer._id}
                          className="border-[1.5px] border-input hover:bg-[#f7eede]"
                        >
                          <TableCell className="font-medium">
                            {freelancer.name || "N/A"}
                          </TableCell>
                          <TableCell>{freelancer.email}</TableCell>
                          <TableCell>{freelancer.phone || "N/A"}</TableCell>
                          <TableCell>
                            {freelancer.city && freelancer.country
                              ? `${freelancer.city}, ${freelancer.country}`
                              : "N/A"}
                          </TableCell>
                          <TableCell>{freelancer.position || "N/A"}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {freelancer.skills
                                ?.slice(0, 2)
                                .map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs border border-input"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {freelancer.skills?.length > 2 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border border-input"
                                >
                                  +{freelancer.skills.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className=" border border-input"
                            >
                              {freelancer.bids || 0}
                            </Badge>
                          </TableCell>
                          <TableCell>${freelancer.amount || 0}/hr</TableCell>
                          <TableCell>
                            {new Date(
                              freelancer.createdAt
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="secondary"
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteClick(
                                      freelancer._id,
                                      freelancer.name || "Unknown"
                                    )
                                  }
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Freelancer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Freelancer"
        description={`Are you sure you want to delete "${deleteModal.freelancerName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
}
