import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function ThankYou() {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("id");

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <Card>
        <CardContent className="p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fc4c02]/10">
            <svg
              className="h-8 w-8 text-[#fc4c02]"
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
          <h1 className="text-3xl font-bold text-[#0a0a0a]">Application Submitted</h1>
          <p className="mt-4 text-neutral-600">
            Thank you for applying. We will review your application and get back
            to you soon.
          </p>
          {applicationId && (
            <p className="mt-6 rounded-lg bg-neutral-100 px-4 py-3 font-mono text-sm text-[#0a0a0a]">
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
