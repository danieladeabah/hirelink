import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Application, Job, PipelineStage } from "../types";
import { MOCK_JOBS } from "../lib/mock-data";

interface AppState {
  jobs: Job[];
  applications: Application[];
  addApplication: (application: Omit<Application, "id" | "createdAt" | "stage">) => string;
  updateApplicationStage: (id: string, stage: PipelineStage) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  getApplicationById: (id: string) => Application | undefined;
  getApplicationsByStage: (stage: PipelineStage) => Application[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      jobs: MOCK_JOBS,
      applications: [],

      addApplication: (application) => {
        const id = `APP-${uuidv4().slice(0, 8).toUpperCase()}`;
        const newApplication: Application = {
          ...application,
          id,
          stage: "Applied",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          applications: [...state.applications, newApplication],
        }));
        return id;
      },

      updateApplicationStage: (id, stage) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, stage } : app
          ),
        }));
      },

      updateApplication: (id, updates) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updates } : app
          ),
        }));
      },

      getApplicationById: (id) => {
        return get().applications.find((app) => app.id === id);
      },

      getApplicationsByStage: (stage) => {
        return get().applications.filter((app) => app.stage === stage);
      },
    }),
    { name: "hirelink-store" }
  )
);
