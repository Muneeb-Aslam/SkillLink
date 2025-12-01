"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import moment from "moment";

interface WorkProgressProps {
  projectId: string;
  initialProgress: number;
  initialHistory: Array<{
    percentage: number;
    updatedBy: string;
    updatedByRole: "client" | "freelancer" | "admin";
    comment?: string;
    updatedAt: Date;
  }>;
  userRole: "client" | "freelancer" | "admin";
  userId: string;
}

export default function WorkProgress({
  projectId,
  initialProgress,
  initialHistory,
  userRole,
  userId,
}: WorkProgressProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [history, setHistory] = useState(initialHistory);
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [canUpdate] = useState(userRole === "client" || userRole === "admin");

  const handleUpdateProgress = async () => {
    if (progress < 0 || progress > 100) {
      toast.error("Progress must be between 0 and 100");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch("/api/projects/work-progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          percentage: progress,
          comment,
          updatedBy: userId,
          updatedByRole: userRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Work progress updated successfully");
        setComment("");
        // Refresh history
        const historyResponse = await fetch(
          `/api/projects/work-progress?projectId=${projectId}`
        );
        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setHistory(historyData.workProgressHistory);
        }
      } else {
        toast.error(data.error?.message || "Failed to update progress");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blackish">
          Work Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              Overall Progress
            </span>
            <span className="text-lg font-bold text-blue">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Update Section - For Clients and Admins */}
        {canUpdate && (
          <div className="space-y-3 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Update Progress (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Comment (Optional)
              </label>
              <TextArea
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
                placeholder="Add a comment about the progress update..."
                rows={3}
              />
            </div>
            <Button
              onClick={handleUpdateProgress}
              disabled={isUpdating}
              className="w-full bg-blue hover:bg-blue/90"
            >
              {isUpdating ? "Updating..." : "Update Progress"}
            </Button>
          </div>
        )}

        {/* History Section */}
        {history && history.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-sm font-bold text-gray-700">
              Progress History
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {[...history].reverse().map((entry, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm font-semibold text-blue">
                        {entry.percentage}%
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        by {entry.updatedByRole}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {moment(entry.updatedAt).format("MMM DD, YYYY HH:mm")}
                    </span>
                  </div>
                  {entry.comment && (
                    <p className="text-sm text-gray-600 mt-1">
                      {entry.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
