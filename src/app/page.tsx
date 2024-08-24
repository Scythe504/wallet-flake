import { Address } from "@/components/addresses/address";
import { SendToken } from "@/components/sendtoken/sendtoken";
// import { ImportWallet } from "@/components/import/import-wallet";

export default function Home() {
  return <main className="w-screen h-screen md:px-15 lg:px-30">
    {/* <ImportWallet/> */}
    <SendToken/>
  </main>
}