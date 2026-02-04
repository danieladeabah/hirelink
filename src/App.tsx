import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { JobListings } from "./pages/job-listings";
import { ApplicationForm } from "./components/application-form/application-form";
import { ThankYou } from "./pages/thank-you";
import { Pipeline } from "./pages/recruiter/pipeline";

export function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[#fafafa] text-[#0a0a0a] antialiased">
        <Header />
        <main className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<JobListings />} />
            <Route path="/apply/:jobId" element={<ApplicationForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/recruiter" element={<Pipeline />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
