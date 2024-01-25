import { sql } from '@vercel/postgres';
import Client from './client';
import { unstable_noStore as noStore } from 'next/cache';
export default async function Home() {
  noStore();
	const { rows: planes } = await sql`SELECT * from planes`;
	const { rows: flights } = await sql`SELECT * from flights`;

	return (
		<main className="bg-plane bg-contain bg-stone-300 md:bg-[length:45%] flex text-black  min-h-screen flex-col items-center py-3 px-3">
      <h1 className='text-3xl pb-4'>Add a new flight</h1>
			<Client allPlanes={planes as Plane[]}></Client>


		</main>
	);
}
