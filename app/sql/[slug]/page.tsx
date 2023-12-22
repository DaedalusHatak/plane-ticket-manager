import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
export default async function Home({params}: {params:{slug:string}}) {
  noStore();
 const {rows} = await sql`SELECT * from flights WHERE tickets_name = ${params.slug.toUpperCase()}`
console.log(rows)
	return (
		<main className="flex text-black  min-h-screen flex-col items-center py-3 px-3">
    {rows.map(flight => (
      <div key={flight.id}>
        {flight.plane} = {flight.tickets_name}
      </div>
    ))}
		</main>
	);
}
