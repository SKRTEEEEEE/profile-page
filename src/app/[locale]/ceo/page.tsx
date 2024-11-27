import { CoverParticles } from "@/components/oth/cover-particles";
import Introduction from "@/components/ceo/introduction";
import TransitionPage from "@/components/oth/transition-page";
type CeoProps = {
    searchParams?: Promise<{ 
      redirect: string
     }>
  }
export default async function CeoPage({searchParams}:CeoProps) {
  const redirect = (await searchParams)?.redirect
  if(redirect === "manageRoot")console.log("You have been redirected to the admin page because you have visited the page 3 times. You can now manage the page.")
    return (
      <main>
        <TransitionPage />
        <div className="flex w-full min-h-dvh bg-no-repeat bg-gradient-cover">
          <CoverParticles />
          <Introduction />
        </div>
      </main>
    );
  }
  