import AddPlane from '@/src/components/(admin)/add-plane/addPlane';
import { sql } from '@vercel/postgres';

import { unstable_noStore as noStore } from 'next/cache';
export default async function Home() {
  noStore();
	const { rows: planes } = await sql`SELECT * from planes`;
	const { rows: airports } = await sql`SELECT * from airports`;
	return (
		<main className="bg-plane bg-contain bg-stone-300 md:bg-[length:45%] flex text-black  min-h-screen flex-col items-center py-3 px-3">
      <h1 className='text-3xl pb-4'>Add a new flight</h1>
			<AddPlane airports={airports as Airport[]} allPlanes={planes as Plane[]}></AddPlane>


		</main>
	);
}
