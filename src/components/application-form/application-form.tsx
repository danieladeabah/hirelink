import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../stores/use-app-store";
import {
  personalInfoSchema,
  experienceSchema,
  resumeSchema,
  type PersonalInfoFormData,
  type ExperienceFormData,
} from "../../lib/validation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "../../lib/utils";

const STEPS = [
  { id: 1, label: "Personal Info", key: "personal" },
  { id: 2, label: "Experience & Skills", key: "experience" },
  { id: 3, label: "Resume Upload", key: "resume" },
] as const;

export function ApplicationForm() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const jobs = useAppStore((state) => state.jobs);
  const addApplication = useAppStore((state) => state.addApplication);

  const job = jobs.find((j) => j.id === jobId);
  const [step, setStep] = useState(1);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const personalForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const experienceForm = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema) as Resolver<ExperienceFormData>,
    defaultValues: {
      yearsOfExperience: 0,
      skills: "",
      portfolioLink: "",
    },
  });

  const handleNext = async () => {
    if (step === 1) {
      const valid = await personalForm.trigger();
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await experienceForm.trigger();
      if (valid) setStep(3);
    }
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError(null);
    const files = e.target.files;
    if (!files?.length) {
      setResumeFile(null);
      return;
    }
    const result = resumeSchema.safeParse({ resume: files });
    if (result.success) {
      setResumeFile(files[0]);
    } else {
      const firstIssue = result.error.issues[0];
      setResumeError(firstIssue?.message ?? "Invalid file");
      setResumeFile(null);
    }
  };

  const handleSubmit = () => {
    if (!job || !resumeFile) {
      setResumeError("Please upload your resume");
      return;
    }

    const applicationId = addApplication({
      jobId: job.id,
      jobTitle: job.title,
      personalInfo: personalForm.getValues(),
      experience: {
        ...experienceForm.getValues(),
        portfolioLink: experienceForm.getValues().portfolioLink || "",
      },
      resumeFileName: resumeFile.name,
    });

    navigate(`/thank-you?id=${applicationId}`);
  };

  if (!job) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24">
        <Card className="border-0 bg-[#fafafa]">
          <CardContent className="p-8">
            <p className="text-neutral-600">Job not found.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/")}
            >
              Back to Jobs
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0a0a]">Apply: {job.title}</h1>
        <p className="mt-2 text-neutral-600">{job.location}</p>
      </div>

      <div className="mb-6 flex gap-2">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={cn(
              "h-1 flex-1 rounded-full transition",
              step >= s.id ? "bg-[#fc4c02]" : "bg-neutral-200"
            )}
          />
        ))}
      </div>

      <Card className="border-0 bg-[#fafafa]">
        <CardHeader>
          <h2 className="text-lg font-semibold">{STEPS[step - 1].label}</h2>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  className="mt-1"
                  {...personalForm.register("fullName")}
                />
                {personalForm.formState.errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1"
                  {...personalForm.register("email")}
                />
                {personalForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  className="mt-1"
                  placeholder="+1 234 567 8900"
                  {...personalForm.register("phone")}
                />
                {personalForm.formState.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {personalForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-4">
              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  min={0}
                  max={50}
                  className="mt-1"
                  {...experienceForm.register("yearsOfExperience", {
                    valueAsNumber: true,
                  })}
                />
                {experienceForm.formState.errors.yearsOfExperience && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceForm.formState.errors.yearsOfExperience.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="skills">Skills</Label>
                <textarea
                  id="skills"
                  rows={4}
                  className="mt-1 flex w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#fc4c02]"
                  placeholder="Describe your skills and technologies..."
                  {...experienceForm.register("skills")}
                />
                {experienceForm.formState.errors.skills && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceForm.formState.errors.skills.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="portfolioLink">Portfolio Link (optional)</Label>
                <Input
                  id="portfolioLink"
                  type="url"
                  className="mt-1"
                  placeholder="https://..."
                  {...experienceForm.register("portfolioLink")}
                />
                {experienceForm.formState.errors.portfolioLink && (
                  <p className="mt-1 text-sm text-red-600">
                    {experienceForm.formState.errors.portfolioLink.message}
                  </p>
                )}
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <Label>Resume (PDF or DOC/DOCX, max 5MB)</Label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                className="mt-2"
                onChange={handleResumeChange}
              />
              {resumeError && (
                <p className="mt-2 text-sm text-red-600">{resumeError}</p>
              )}
              {resumeFile && (
                <p className="mt-2 text-sm text-[#fc4c02]">
                  Selected: {resumeFile.name}
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={!resumeFile}>
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
