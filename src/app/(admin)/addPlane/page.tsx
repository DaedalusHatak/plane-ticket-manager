import AddPlane from '@/src/components/(admin)/add-plane/addPlane';
import NavBar from '@/src/components/(admin)/navBar';
import { sql } from '@vercel/postgres';

import { unstable_noStore as noStore } from 'next/cache';
export default async function Home() {
	noStore();
	const { rows: planes } = await sql`SELECT * from planes`;
	const { rows: airports } = await sql`SELECT * from airports`;

	return (
		<main className="flex text-black flex-col items-center min-h-screen ">
			<NavBar></NavBar>
			<AddPlane
				airports={airports as Airport[]}
				allPlanes={planes as Plane[]}
			></AddPlane>
		</main>
	);
}
