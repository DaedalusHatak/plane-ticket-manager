import { sql } from '@vercel/postgres';
import Client from './client';
import { unstable_noStore as noStore } from 'next/cache';
export default async function Home() {
  noStore();
	const { rows: planes } = await sql`SELECT * from planes`;
	const { rows: flights } = await sql`SELECT * from flights`;

	return (
		<main className="flex text-black  min-h-screen flex-col items-center py-3 px-3">
      <h1 className='text-3xl pb-4'>Add a new flight</h1>
			<Client allPlanes={planes as Plane[]}></Client>
      <table className='mt-3 border border-black'>
     <tbody>
     <tr className='border border-black'>
             <th className='border border-black'>Planes</th>
            <th className='border border-black'>Flight Code</th>
            <th className='border border-black'>Prices</th>
            </tr>
           
            {flights.map((flight) => ( 
             <tr  key={flight.id} className='border border-black'>
            <th className='border border-black'>{flight.plane}</th> 
            <th className='border border-black'>{flight.tickets_name}</th> 
            <th className='border border-black'>{flight.prices.join(', ')}</th> 
            </tr>
            ))}
           
     </tbody>
        
      	</table>
		</main>
	);
}
