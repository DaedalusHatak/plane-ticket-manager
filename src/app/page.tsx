import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import SearchConnection from "../components/(user)/home/searchConnection";
import Modal from "../components/(global)/modal";
export default async function Home() {
  noStore();
  const { rows: airports } = await sql`SELECT * from airports`;
 
  return (
    <main className="flex text-black  min-h-screen flex-col items-center py-3 px-3">
      <Modal></Modal>
      <h1 className="text-2xl">Find connection</h1>
      <SearchConnection airports={airports as Airport[]}></SearchConnection>
   
    </main>
  );
}
