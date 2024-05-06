"use client"

import { CoverParticles } from "@/components/main/cover-particles";
import Introduction from "@/components/routes/introduction";
import TransitionPage from "@/components/main/transition-page";

export default function Home() {
  return (
    <main>
      <TransitionPage />
      <div className="flex max-h-[100vh] bg-no-repeat bg-gradient-cover">
        <CoverParticles />
        <Introduction />
      </div>
    </main>
  );
}
