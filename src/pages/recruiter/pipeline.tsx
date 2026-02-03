import { useState } from "react";
import { useAppStore } from "../../stores/use-app-store";
import type { Application, PipelineStage } from "../../types";
import { PIPELINE_STAGES } from "../../types";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CandidateReviewPanel } from "../../components/recruiter/candidate-review-panel";
import { cn } from "../../lib/utils";

export function Pipeline() {
  const applications = useAppStore((state) => state.applications);
  const updateApplicationStage = useAppStore((state) => state.updateApplicationStage);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedApp = applications.find((a) => a.id === selectedId);

  const getApplicationsByStage = (stage: PipelineStage) =>
    applications.filter((a) => a.stage === stage);

  const moveToStage = (appId: string, newStage: PipelineStage) => {
    updateApplicationStage(appId, newStage);
    setSelectedId(appId);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0a0a]">Recruitment Pipeline</h1>
        <p className="mt-2 text-neutral-600">
          Click a candidate to review. Use the stage buttons to move candidates.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minWidth: "max-content" }}>
            {PIPELINE_STAGES.map((stage) => (
              <PipelineColumn
                key={stage}
                stage={stage}
                applications={getApplicationsByStage(stage)}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onMoveToStage={moveToStage}
              />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {selectedApp ? (
            <CandidateReviewPanel
              application={selectedApp}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <Card className="p-8">
              <p className="text-center text-neutral-500">
                Select a candidate to view details
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

interface PipelineColumnProps {
  stage: PipelineStage;
  applications: Application[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMoveToStage: (appId: string, stage: PipelineStage) => void;
}

function PipelineColumn({
  stage,
  applications,
  selectedId,
  onSelect,
  onMoveToStage,
}: PipelineColumnProps) {
  return (
    <div className="flex w-64 shrink-0 flex-col">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        {stage}
      </h2>
      <div className="flex min-h-[200px] flex-1 flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50/50 p-3">
        {applications.map((app) => (
          <Card
            key={app.id}
            className={cn(
              "cursor-pointer transition",
              selectedId === app.id && "ring-2 ring-[#fc4c02]"
            )}
            onClick={() => onSelect(app.id)}
          >
            <CardContent className="p-4">
              <p className="font-medium text-[#0a0a0a]">{app.personalInfo.fullName}</p>
              <p className="text-sm text-neutral-500">{app.jobTitle}</p>
              <p className="mt-1 text-xs text-neutral-400">{app.id}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {PIPELINE_STAGES.filter((s) => s !== stage).map((nextStage) => (
                  <Button
                    key={nextStage}
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveToStage(app.id, nextStage);
                    }}
                  >
                    → {nextStage.split(" ")[0]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
