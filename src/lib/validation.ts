import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(20, "Phone must be under 20 characters")
    .regex(/^[\d\s\-+()]+$/, "Invalid phone number"),
});

export const experienceSchema = z.object({
  yearsOfExperience: z
    .number()
    .refine((n) => !Number.isNaN(n), "Enter a number")
    .min(0, "Must be 0 or more")
    .max(50, "Must be 50 or less"),
  skills: z
    .string()
    .min(10, "Please describe your skills (min 10 characters)")
    .max(500, "Skills must be under 500 characters"),
  portfolioLink: z
    .string()
    .refine((s) => s === "" || z.string().url().safeParse(s).success, "Invalid URL"),
});

export const resumeSchema = z.object({
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Resume is required")
    .refine(
      (files) =>
        ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
          files[0]?.type ?? ""
        ),
      "Only PDF and DOC/DOCX files are allowed"
    )
    .refine((files) => (files[0]?.size ?? 0) <= 5 * 1024 * 1024, "File must be under 5MB"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
