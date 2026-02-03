import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/header";
import { JobListings } from "./pages/job-listings";
import { ApplicationForm } from "./components/application-form/application-form";
import { ThankYou } from "./pages/thank-you";
import { Pipeline } from "./pages/recruiter/pipeline";

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a] antialiased">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<JobListings />} />
            <Route path="/apply/:jobId" element={<ApplicationForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/recruiter" element={<Pipeline />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
