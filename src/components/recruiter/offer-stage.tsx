import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { Application } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface OfferStageProps {
  application: Application;
  onDraftOffer: (offerLetter: string) => void;
}

export function OfferStage({ application, onDraftOffer }: OfferStageProps) {
  const [open, setOpen] = useState(false);
  const [offerText, setOfferText] = useState(application.offerLetter ?? "");

  const defaultOffer = `OFFER OF EMPLOYMENT

Dear ${application.personalInfo.fullName},

We are pleased to offer you the position of ${application.jobTitle} at [Company Name].

Key Terms:
- Start Date: [To be determined]
- Salary: [Competitive compensation]
- Benefits: [Health, Dental, 401k, etc.]

Please sign and return this letter by [Date] to accept this offer.

Sincerely,
[Recruiter Name]
[Company Name]`;

  const handleDraft = () => {
    setOfferText(application.offerLetter ?? defaultOffer);
    setOpen(true);
  };

  const handleSend = () => {
    onDraftOffer(offerText);
    setOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold text-[#0a0a0a]">Offer Stage</h3>
        {application.offerLetter ? (
          <p className="mt-2 text-sm text-[#fc4c02]">Offer sent</p>
        ) : (
          <>
            <p className="mt-2 text-sm text-neutral-600">
              Draft and send a mock offer letter
            </p>
            <Button size="sm" className="mt-3 w-full" onClick={handleDraft}>
              Draft Offer
            </Button>
          </>
        )}
      </CardContent>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-200 bg-white p-6">
            <Dialog.Title className="text-lg font-semibold text-[#0a0a0a]">
              Offer Letter
            </Dialog.Title>
            <textarea
              className="mt-4 h-64 w-full resize-none rounded-lg border border-neutral-300 bg-white p-4 text-sm text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#fc4c02]"
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              placeholder="Enter offer letter content..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button onClick={handleSend}>Send Offer</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Card>
  );
}
