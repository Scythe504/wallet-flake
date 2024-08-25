import { AnimatedComponent } from "@/components/onboarding/hero-section/animate-up";
import { HeroSection } from "@/components/onboarding/hero-section/main-section";
import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";

export default function Home() {
  return <main className="w-screen h-screen md:px-15 lg:px-30 px-4">
    <OnboardingNavbar enableSidebar={false} />
    {/* <ImportWallet/> */}
    <AnimatedComponent>
      <HeroSection />
    </AnimatedComponent>
  </main>
}