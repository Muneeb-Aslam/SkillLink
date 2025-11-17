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

interface Project {
  _id: string;
  title: string;
  description: string;
  clientId: string;
  freelancerId: string | null;
  budget: {
    from: string;
    to: string;
  };
  skills: Array<{
    name: string;
  }>;
  categories: Array<{
    name: string;
  }>;
  milestones: Array<{
    name: string;
    price: string;
    deadline: string;
    status: string;
  }>;
  createdAt: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    projectId: string | null;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: null,
    projectTitle: "",
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
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/admin/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteClick = (projectId: string, projectTitle: string) => {
    setDeleteModal({
      isOpen: true,
      projectId,
      projectTitle,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.projectId) return;

    try {
      const response = await fetch(
        `/api/admin/projects/${deleteModal.projectId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProjects(
          projects.filter((project) => project._id !== deleteModal.projectId)
        );
        setDeleteModal({ isOpen: false, projectId: null, projectTitle: "" });
        addToast(
          "success",
          "Project deleted successfully",
          "The project has been removed from the platform."
        );
      } else {
        addToast(
          "error",
          "Failed to delete project",
          "Please try again later."
        );
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      addToast(
        "error",
        "Error deleting project",
        "An unexpected error occurred."
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, projectId: null, projectTitle: "" });
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

  const getProjectStatus = (project: Project) => {
    if (project.freelancerId) {
      return "Assigned";
    }
    return "Open";
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Assigned":
        return "default";
      case "Open":
        return "secondary";
      default:
        return "outline";
    }
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
                  Projects Management
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Manage all projects on the platform
                </p>
              </div>
              <Link href="/admin">
                <Button variant="secondary">Back to Dashboard</Button>
              </Link>
            </div>
          </div>

          <Card className="bg-[#FAF7F1]  shadow-lg rounded-lg border-[1.5px] border-[#f8f4f4f1]">
            <CardHeader>
              <CardTitle>All Projects ({projects.length})</CardTitle>
              <CardDescription>
                A list of all projects on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-input">
                <Table className="border-[1.5px] border-input">
                  <TableHeader>
                    <TableRow className="border-[1.5px] border-input text-blue">
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Milestones</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-8 text-gray-500"
                        >
                          No projects found
                        </TableCell>
                      </TableRow>
                    ) : (
                      projects.map((project) => {
                        const status = getProjectStatus(project);
                        return (
                          <TableRow
                            key={project._id}
                            className="border-[1.5px] border-input hover:bg-[#f7eede]"
                          >
                            <TableCell className="font-medium max-w-[200px]">
                              <div className="truncate" title={project.title}>
                                {project.title}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[300px]">
                              <div
                                className="truncate"
                                title={project.description}
                              >
                                {project.description}
                              </div>
                            </TableCell>
                            <TableCell>
                              ${project.budget.from} - ${project.budget.to}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {project.skills
                                  ?.slice(0, 2)
                                  .map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs border border-input"
                                    >
                                      {typeof skill === "string"
                                        ? skill
                                        : skill.name}
                                    </Badge>
                                  ))}
                                {project.skills?.length > 2 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs border border-input"
                                  >
                                    +{project.skills.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {project.categories
                                  ?.slice(0, 1)
                                  .map((category, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs border border-input"
                                    >
                                      {typeof category === "string"
                                        ? category
                                        : category.name}
                                    </Badge>
                                  ))}
                                {project.categories?.length > 1 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs border border-input"
                                  >
                                    +{project.categories.length - 1}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusVariant(status)}
                                className="border border-input"
                              >
                                {status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {project.milestones?.length || 0} milestones
                            </TableCell>
                            <TableCell>
                              {new Date(project.createdAt).toLocaleDateString()}
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
                                        project._id,
                                        project.title
                                      )
                                    }
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Project
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
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
        title="Delete Project"
        description={`Are you sure you want to delete "${deleteModal.projectTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
}
