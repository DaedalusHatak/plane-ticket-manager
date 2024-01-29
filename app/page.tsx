import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import FindConnection from "./connection";
import Modal from "./modal";
import ShowTowns from "./showTowns";
export default async function Home() {
  noStore();
  const { rows: airports } = await sql`SELECT * from airports`;
 
  return (
    <main className="flex text-black  min-h-screen flex-col items-center py-3 px-3">
      <Modal></Modal>
      <h1>Find connection</h1>
      <FindConnection airports={airports as Airport[]}></FindConnection>
   
    </main>
  );
}
