"use client"

import { CoverParticles } from "@/components/ceo/cover-particles";
import Introduction from "@/components/ceo/introduction";
import TransitionPage from "@/components/oth/transition-page";

export default function Home() {
    return (
      <main>
        <TransitionPage />
        <div className="flex min-h-[100vh]">
          <CoverParticles />
          <Introduction />
        </div>
      </main>
    );
  }
  