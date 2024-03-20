import { QueryResultRow, sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import Grid from "./grid";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import WarningModal from "./warningModal";


export default async function Home({ params }: { params: { slug: string } }) {
  noStore();
  const passId = cookies().get("passid");
  if(!passId) redirect("/");
  const {rows:fileJson} = await sql`SELECT * from basket WHERE (uuid = ${passId?.value}) AND (ticket_code = ${params.slug})`
  if (!fileJson) redirect("/");

  const { rows } =
    await sql`SELECT * from seats WHERE ticket_id = ${params.slug.toUpperCase()} ORDER BY seat_number ASC`;


  const newChunkedArray: QueryResultRow | number = [];
  for (let i = 0; i < rows.length; i += 6) {
    const chunk = rows.slice(i, i + 6);
    newChunkedArray.push(
      ...chunk.slice(0, 3),
      Math.floor(i / 6) + 1,
      ...chunk.slice(3)
    );
  }


  return (
    <main className="flex text-black  min-h-svh flex-col items-center ">
    
      <Grid passId={passId!} ticketId={params.slug.toUpperCase()} passengerList={fileJson[0] as PassengerData} data={newChunkedArray as Seat[]}></Grid>
    </main>
  );
}
