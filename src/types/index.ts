export const PIPELINE_STAGES = [
  "Applied",
  "Reviewed",
  "Interview Scheduled",
  "Offer Sent",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  stage: PipelineStage;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  experience: {
    yearsOfExperience: number;
    skills: string;
    portfolioLink: string;
  };
  resumeFileName?: string;
  score?: number;
  notes?: string;
  interviewDate?: string;
  offerLetter?: string;
  createdAt: string;
}
