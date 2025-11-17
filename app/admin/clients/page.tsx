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

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  position: string;
  createdAt: string;
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    clientId: string | null;
    clientName: string;
  }>({
    isOpen: false,
    clientId: null,
    clientName: "",
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
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/admin/clients");
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDeleteClick = (clientId: string, clientName: string) => {
    setDeleteModal({
      isOpen: true,
      clientId,
      clientName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.clientId) return;

    try {
      const response = await fetch(
        `/api/admin/clients/${deleteModal.clientId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setClients(
          clients.filter((client) => client._id !== deleteModal.clientId)
        );
        setDeleteModal({ isOpen: false, clientId: null, clientName: "" });
        addToast(
          "success",
          "Client deleted successfully",
          "The client has been removed from the platform."
        );
      } else {
        addToast("error", "Failed to delete client", "Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      addToast(
        "error",
        "Error deleting client",
        "An unexpected error occurred."
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, clientId: null, clientName: "" });
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
                  Clients Management
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Manage all client accounts on the platform
                </p>
              </div>
              <Link href="/admin">
                <Button variant="secondary">Back to Dashboard</Button>
              </Link>
            </div>
          </div>

          <Card className="bg-[#FAF7F1]  shadow-lg rounded-lg border-[1.5px] border-[#f8f4f4f1]">
            <CardHeader>
              <CardTitle>All Clients ({clients.length})</CardTitle>
              <CardDescription>
                A list of all registered clients on the platform
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
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-500"
                        >
                          No clients found
                        </TableCell>
                      </TableRow>
                    ) : (
                      clients.map((client) => (
                        <TableRow
                          key={client._id}
                          className="border-[1.5px] border-input hover:bg-[#f7eede]"
                        >
                          <TableCell className="font-medium">
                            {client.name || "N/A"}
                          </TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone || "N/A"}</TableCell>
                          <TableCell>
                            {client.city && client.country
                              ? `${client.city}, ${client.country}`
                              : "N/A"}
                          </TableCell>
                          <TableCell>{client.position || "N/A"}</TableCell>
                          <TableCell>
                            {new Date(client.createdAt).toLocaleDateString()}
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
                                      client._id,
                                      client.name || "Unknown"
                                    )
                                  }
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Client
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
        title="Delete Client"
        description={`Are you sure you want to delete "${deleteModal.clientName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
}
