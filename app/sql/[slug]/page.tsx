import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import Grid from './grid';
export default async function Home({params}: {params:{slug:string}}) {
  noStore();
 const {rows} = await sql`SELECT * from seats WHERE ticket_id = ${params.slug.toUpperCase()}`
 const newChunkedArray = []
 for (let i = 0; i < rows.length; i += 6) {
   const chunk = rows.slice(i, i + 6);
   newChunkedArray.push(
     ...chunk.slice(0, 3),
     Math.floor(i / 6) + 1,
     ...chunk.slice(3)
   );
 }
	return (
		<main className="flex text-black  min-h-screen flex-col items-center py-3 px-3">
    {/* {rows.map(flight => (
      <div key={flight.id}>
        {flight.seat_number} 
      </div>
    ))} */}
    <Grid data={newChunkedArray}></Grid>
		</main>
	);
}
