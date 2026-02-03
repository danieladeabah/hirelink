import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";

interface InterviewSchedulerProps {
  applicationId: string;
  currentDate?: string;
  onSchedule: (isoDate: string) => void;
}

export function InterviewScheduler({
  currentDate,
  onSchedule,
}: InterviewSchedulerProps) {
  const [date, setDate] = useState(
    currentDate ? currentDate.slice(0, 16) : ""
  );
  const [scheduled, setScheduled] = useState(!!currentDate);

  const handleSchedule = () => {
    if (!date) return;
    const iso = new Date(date).toISOString();
    onSchedule(iso);
    setScheduled(true);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold text-[#0a0a0a]">Schedule Interview</h3>
        {scheduled && currentDate ? (
          <p className="mt-2 text-sm text-[#fc4c02]">
            Scheduled: {new Date(currentDate).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            <Label htmlFor="interview-datetime">Date & Time</Label>
            <Input
              id="interview-datetime"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
            <Button
              size="sm"
              className="w-full"
              onClick={handleSchedule}
              disabled={!date}
            >
              Schedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
