import { sql } from "@vercel/postgres";
import Client from "./client";

export default async function Home() {
    const { rows } = await sql`SELECT * from planes`;


  return (
    <main className="flex text-black  min-h-screen flex-col items-center py-6 px-3">
<Client allPlanes={rows}></Client>

    </main>
  );
}
