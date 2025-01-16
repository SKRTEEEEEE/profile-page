import { CoverParticles } from "@/components/oth/cover-particles";
import Introduction from "@/components/ceo/introduction";
import TransitionPage from "@/components/oth/transition-page";

export default function CeoPage() {

    return (
      <main className="">
        <TransitionPage />
        <div className="flex w-full min-h-dvh">
          <CoverParticles />
          <Introduction />
        </div>
      </main>
    );
  }
  