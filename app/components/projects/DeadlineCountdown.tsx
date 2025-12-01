"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import moment from "moment";

interface DeadlineCountdownProps {
  projectId: string;
  initialDeadline: Date | null;
  initialCountdownStarted: boolean;
  userRole: "client" | "freelancer" | "admin";
}

export default function DeadlineCountdown({
  projectId,
  initialDeadline,
  initialCountdownStarted,
  userRole,
}: DeadlineCountdownProps) {
  const [deadline, setDeadline] = useState<Date | null>(
    initialDeadline ? new Date(initialDeadline) : null
  );
  const [countdownStarted, setCountdownStarted] = useState(
    initialCountdownStarted
  );
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [canStartCountdown, setCanStartCountdown] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newDeadline, setNewDeadline] = useState("");

  useEffect(() => {
    const fetchDeadlineInfo = async () => {
      try {
        const response = await fetch(
          `/api/projects/deadline?projectId=${projectId}`
        );
        if (response.ok) {
          const data = await response.json();
          setDeadline(data.deadline ? new Date(data.deadline) : null);
          setCountdownStarted(data.countdownStarted);
          setDaysRemaining(data.daysRemaining);
          setCanStartCountdown(data.canStartCountdown);
        }
      } catch (error) {
        console.error("Error fetching deadline info:", error);
      }
    };

    fetchDeadlineInfo();
  }, [projectId]);

  useEffect(() => {
    if (!deadline || !countdownStarted) return;

    const updateCountdown = () => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const diff = deadlineDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [deadline, countdownStarted]);

  const handleSetDeadline = async () => {
    if (!newDeadline) {
      toast.error("Please select a deadline date");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch("/api/projects/deadline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          deadline: newDeadline,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Deadline set successfully");
        setDeadline(new Date(newDeadline));
        setNewDeadline("");
        // Refresh deadline info
        const infoResponse = await fetch(
          `/api/projects/deadline?projectId=${projectId}`
        );
        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          setDaysRemaining(infoData.daysRemaining);
          setCanStartCountdown(infoData.canStartCountdown);
        }
      } else {
        toast.error(data.error?.message || "Failed to set deadline");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStartCountdown = async () => {
    if (!deadline) {
      toast.error("Please set a deadline first");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch("/api/projects/deadline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          startCountdown: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Countdown started successfully");
        setCountdownStarted(true);
        setCanStartCountdown(false);
      } else {
        toast.error(data.error?.message || "Failed to start countdown");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Not set";
    return moment(date).format("MMMM DD, YYYY");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blackish">
          Project Deadline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Deadline Display */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              Deadline Date
            </span>
            <span className="text-lg font-bold text-blue">
              {formatDate(deadline)}
            </span>
          </div>
          {daysRemaining !== null && (
            <div className="text-sm text-gray-600">
              {daysRemaining > 0
                ? `${daysRemaining} days remaining`
                : daysRemaining === 0
                ? "Deadline is today"
                : "Deadline has passed"}
            </div>
          )}
        </div>

        {/* Countdown Timer */}
        {countdownStarted && deadline && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-sm font-bold text-gray-700">Countdown Timer</h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-3 bg-blue/10 rounded-lg">
                <div className="text-2xl font-bold text-blue">
                  {timeRemaining.days}
                </div>
                <div className="text-xs text-gray-600">Days</div>
              </div>
              <div className="text-center p-3 bg-blue/10 rounded-lg">
                <div className="text-2xl font-bold text-blue">
                  {timeRemaining.hours}
                </div>
                <div className="text-xs text-gray-600">Hours</div>
              </div>
              <div className="text-center p-3 bg-blue/10 rounded-lg">
                <div className="text-2xl font-bold text-blue">
                  {timeRemaining.minutes}
                </div>
                <div className="text-xs text-gray-600">Minutes</div>
              </div>
              <div className="text-center p-3 bg-blue/10 rounded-lg">
                <div className="text-2xl font-bold text-blue">
                  {timeRemaining.seconds}
                </div>
                <div className="text-xs text-gray-600">Seconds</div>
              </div>
            </div>
          </div>
        )}

        {/* Set Deadline - Available for all roles */}
        <div className="space-y-3 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Set/Update Deadline
            </label>
            <Input
              type="datetime-local"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            onClick={handleSetDeadline}
            disabled={isUpdating || !newDeadline}
            className="w-full bg-blue hover:bg-blue/90"
          >
            {isUpdating ? "Updating..." : "Set Deadline"}
          </Button>
        </div>

        {/* Start Countdown Button */}
        {deadline && !countdownStarted && canStartCountdown && (
          <div className="pt-2">
            <Button
              onClick={handleStartCountdown}
              disabled={isUpdating}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isUpdating ? "Starting..." : "Start Countdown Timer"}
            </Button>
          </div>
        )}

        {/* Warning if less than 7 days */}
        {deadline &&
          daysRemaining !== null &&
          daysRemaining < 7 &&
          !countdownStarted && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Less than 7 days remaining. Countdown timer cannot be
                started.
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
