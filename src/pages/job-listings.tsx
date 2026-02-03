import { Link } from "react-router-dom";
import { useAppStore } from "../stores/use-app-store";
import { Card, CardContent, CardHeader } from "../components/ui/card";

export function JobListings() {
  const jobs = useAppStore((state) => state.jobs);

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[#0a0a0a]">Open Roles</h1>
        <p className="mt-2 text-lg text-neutral-600">
          Find your next opportunity. Click a role to apply.
        </p>
      </div>

      <div>
        {jobs.map((job) => (
          <Link key={job.id} to={`/apply/${job.id}`} className="block mb-8 last:mb-0">
            <Card className="cursor-pointer transition hover:border-[#fc4c02]/50">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold text-[#0a0a0a]">{job.title}</h2>
                <p className="text-sm text-neutral-500">{job.location}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-neutral-700">{job.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-[#fc4c02]">
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
