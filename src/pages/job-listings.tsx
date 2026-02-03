import { Link } from "react-router-dom";
import { useAppStore } from "../stores/use-app-store";
import { Card, CardContent, CardHeader } from "../components/ui/card";

export function JobListings() {
  const jobs = useAppStore((state) => state.jobs);

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Open Roles</h1>
        <p className="mt-2 text-lg text-white/70">
          Find your next opportunity. Click a role to apply.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link key={job.id} to={`/apply/${job.id}`}>
            <Card className="cursor-pointer transition hover:border-[#3b82f6]/50 hover:bg-[#1a1f26]">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-sm text-white/60">{job.location}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-white/80">{job.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-[#3b82f6]">
                  Apply →
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
