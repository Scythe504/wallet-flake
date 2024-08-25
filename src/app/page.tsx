import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";
import { AddActions } from "@/components/settings/add-actions";
// import { ImportWallet } from "@/components/import/import-wallet";

export default function Home() {
  return <main className="w-screen h-screen md:px-15 lg:px-30 px-4">
    <OnboardingNavbar enableSidebar={false} />
    {/* <ImportWallet/> */}
    <AddActions />
  </main>
}