import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import FindConnection from "./connection";
import Modal from "./modal";
export default async function Home() {
  noStore();
  const { rows: planes } = await sql`SELECT * from planes`;
  const { rows: flights } = await sql`SELECT * from flights`;

  return (
    <main className="flex text-black  min-h-screen flex-col items-center py-3 px-3">
      <Modal></Modal>
      <h1>Find connection</h1>
      <FindConnection></FindConnection>
    </main>
  );
}
