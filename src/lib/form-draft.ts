import type { PersonalInfoFormData, ExperienceFormData } from "./validation";

const DRAFT_PREFIX = "hirelink-application-draft-";

export interface ApplicationDraft {
  step: number;
  personalInfo: PersonalInfoFormData;
  experience: ExperienceFormData;
  resumeFileName: string | null;
}

export function getDraftKey(jobId: string): string {
  return `${DRAFT_PREFIX}${jobId}`;
}

export function loadDraft(jobId: string): ApplicationDraft | null {
  try {
    const raw = localStorage.getItem(getDraftKey(jobId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ApplicationDraft;
    if (
      typeof parsed.step !== "number" ||
      !parsed.personalInfo ||
      !parsed.experience
    ) {
      return null;
    }
    return {
      step: Math.min(3, Math.max(1, parsed.step)),
      personalInfo: {
        fullName: String(parsed.personalInfo.fullName ?? ""),
        email: String(parsed.personalInfo.email ?? ""),
        phone: String(parsed.personalInfo.phone ?? ""),
      },
      experience: {
        yearsOfExperience: Number(parsed.experience.yearsOfExperience ?? 0) || 0,
        skills: String(parsed.experience.skills ?? ""),
        portfolioLink: String(parsed.experience.portfolioLink ?? ""),
      },
      resumeFileName: parsed.resumeFileName ? String(parsed.resumeFileName) : null,
    };
  } catch {
    return null;
  }
}

export function saveDraft(jobId: string, draft: ApplicationDraft): void {
  try {
    localStorage.setItem(getDraftKey(jobId), JSON.stringify(draft));
  } catch {
    // ignore quota or other errors
  }
}

export function clearDraft(jobId: string): void {
  try {
    localStorage.removeItem(getDraftKey(jobId));
  } catch {
    // ignore
  }
}
