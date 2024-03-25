import { QueryResultRow, sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import Grid from "./grid";
import { cookies } from "next/headers";
import ConfirmationWrapper from "./confirmationWrapper";
import NavBarUser from "./navBarUser";




export default async function Home({ params }: { params: { slug: string } }) {
  noStore();
  const passId = cookies().get("passid");
  if(!passId?.value){
    return <ConfirmationWrapper></ConfirmationWrapper>
  }
  else{
    const {rows:fileJson} = await sql`SELECT * from basket WHERE (uuid = ${passId?.value}) AND (ticket_code = ${params.slug})`

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
      <main className="flex text-black bg-slate-200  min-h-svh flex-col items-center ">
     <NavBarUser></NavBarUser>
      <h1 className="w-full text-center text-4xl font-semibold py-8 ">Select your seats</h1>
        <Grid passId={passId!} ticketId={params.slug.toUpperCase()} passengerList={fileJson[0] as PassengerData} data={newChunkedArray as Seat[]}></Grid>
        <footer className="w-full border-t-2 border-slate-400 text-center mt-5 py-6 divide-y">
        © 2024 KicAir. All rights reserved.
      </footer>
      </main>
    );
  }
 
}
