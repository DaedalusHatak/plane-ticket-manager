import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import SearchConnection from "../components/(user)/home/searchConnection";
import Modal from "../components/(global)/modal";
import CardWrapper from "../components/(user)/home/cardWrapper";
import DealsCard from "../components/(user)/home/dealsCard";

export default async function Home() {
  noStore();
  const { rows: airports } = await sql`SELECT * from airports`;

  return (
    <main className="flex text-black relative min-h-screen flex-col items-center px-3 overflow-x-hidden ">
     <div className="bg-gradient-radial from-blue-200  to-indigo-100 min-h-56 flex text-black w-svw left-0 flex-col items-center px-3 py-6">
     <h1 className="text-4xl font-semibold">Find connection</h1>
      <SearchConnection airports={airports as Airport[]}></SearchConnection>
     </div>
     <DealsCard></DealsCard>
    <div>
    <h1 className="text-4xl font-semibold mt-28 mb-5">Why choose KicAir</h1>
      <CardWrapper></CardWrapper>
    </div>
    <footer className="w-svw border-t-2 text-center mt-5 py-6 divide-y">
     © 2024 KicAir. All rights reserved.
    </footer>
    </main>
  );
}
