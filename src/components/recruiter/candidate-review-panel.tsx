import { useState } from "react";
import { useAppStore } from "../../stores/use-app-store";
import type { Application } from "../../types";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader } from "../ui/card";
import { InterviewScheduler } from "./interview-scheduler";
import { OfferStage } from "./offer-stage";

interface CandidateReviewPanelProps {
  application: Application;
  onClose: () => void;
}

export function CandidateReviewPanel({ application, onClose }: CandidateReviewPanelProps) {
  const updateApplication = useAppStore((state) => state.updateApplication);
  const [score, setScore] = useState(application.score ?? 0);
  const [notes, setNotes] = useState(application.notes ?? "");

  const handleSaveScore = (value: number) => {
    setScore(value);
    updateApplication(application.id, { score: value });
  };

  const handleSaveNotes = () => {
    updateApplication(application.id, { notes });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-lg font-semibold">{application.personalInfo.fullName}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-white/60">Application ID</p>
          <p className="font-mono text-sm">{application.id}</p>
        </div>

        <div>
          <p className="text-sm text-white/60">Position</p>
          <p className="font-medium">{application.jobTitle}</p>
        </div>

        <div>
          <p className="text-sm text-white/60">Contact</p>
          <p>{application.personalInfo.email}</p>
          <p>{application.personalInfo.phone}</p>
        </div>

        <div>
          <p className="text-sm text-white/60">Experience</p>
          <p>{application.experience.yearsOfExperience} years</p>
          <p className="mt-1 text-sm">{application.experience.skills}</p>
          {application.experience.portfolioLink && (
            <a
              href={application.experience.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-[#3b82f6] hover:underline"
            >
              Portfolio →
            </a>
          )}
        </div>

        {application.resumeFileName && (
          <div>
            <p className="text-sm text-white/60">Resume</p>
            <p className="text-sm">{application.resumeFileName}</p>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm text-white/60">Score (1–5)</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Button
                key={n}
                variant={score === n ? "primary" : "outline"}
                size="sm"
                className="h-9 w-9 p-0"
                onClick={() => handleSaveScore(n)}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            className="mt-1"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleSaveNotes}
            placeholder="Add recruiter notes..."
          />
        </div>

        {application.stage === "Reviewed" && (
          <InterviewScheduler
            applicationId={application.id}
            currentDate={application.interviewDate}
            onSchedule={(date) =>
              updateApplication(application.id, {
                interviewDate: date,
                stage: "Interview Scheduled",
              })
            }
          />
        )}

        {application.stage === "Interview Scheduled" && (
          <OfferStage
            application={application}
            onDraftOffer={(letter) =>
              updateApplication(application.id, {
                offerLetter: letter,
                stage: "Offer Sent",
              })
            }
          />
        )}

        <p className="text-xs text-white/50">
          Applied {new Date(application.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
