import { QueryResultRow, sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import Grid from "./grid";
import { cookies } from "next/headers";
import { getBasket } from "../../userDetailsForm/getBasket";
import { redirect } from "next/navigation";
export default async function Home({ params }: { params: { slug: string } }) {
  noStore();
  const passId = cookies().get("passid");
  const fileJson = getBasket(passId);
  if (!fileJson) redirect("/");
  const { rows } =
    await sql`SELECT * from seats WHERE ticket_id = ${params.slug.toUpperCase()}`;
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
    <main className="flex text-black  min-h-svh flex-col items-center py-3 px-3">
      <Grid passengerList={fileJson} data={newChunkedArray as Seat[]}></Grid>
    </main>
  );
}
