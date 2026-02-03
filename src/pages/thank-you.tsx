import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function ThankYou() {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("id");

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <Card>
        <CardContent className="p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <svg
              className="h-8 w-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Application Submitted</h1>
          <p className="mt-4 text-white/70">
            Thank you for applying. We will review your application and get back
            to you soon.
          </p>
          {applicationId && (
            <p className="mt-6 rounded-lg bg-white/5 px-4 py-3 font-mono text-sm">
              Your application ID: <strong>{applicationId}</strong>
            </p>
          )}
          <Link to="/" className="mt-8 inline-block">
            <Button>Browse More Jobs</Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
