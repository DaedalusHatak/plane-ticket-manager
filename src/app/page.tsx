import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import SearchConnection from "../components/(user)/home/searchConnection";
import CardWrapper from "../components/(user)/home/cardWrapper";
import DealsCard from "../components/(user)/home/dealsCard";
import LatestFlights from "../components/(user)/home/latestFlights";

export default async function Home() {

  const { rows: airports } = await sql`SELECT * from airports`;
  const { rows: flights } =
    await sql`SELECT * from flights order by id desc limit 5`;
  return (
    <main className="flex text-black relative min-h-svh flex-col items-center  overflow-x-hidden ">
      <div className="bg-blue-200  flex items-center text-black w-svw left-0 flex-col px-12 py-6">
        <h1 className="text-4xl w-full max-w-5xl text-left font-semibold">
          Find connection
        </h1>
        <SearchConnection airports={airports as Airport[]}></SearchConnection>
      </div>
      <div className="w-full flex justify-center bg-gradient-to-b from-blue-200 to-[5%] pt-12">
        <DealsCard></DealsCard>
      </div>
      <div className="w-full flex justify-center gap-5 flex-wrap px-12">
        <h1 className="text-4xl pt-28 w-full max-w-5xl font-semibold">
          Latest flights
        </h1>
        <LatestFlights flights={flights} />
      </div>
      <div className="px-12">
        <h1 className="text-4xl w-full max-w-5xl font-semibold mt-28 mb-5 ">
          Why choose KicAir
        </h1>
        <CardWrapper></CardWrapper>
      </div>
      <footer className="w-svw border-t-2 text-center mt-5 py-6 divide-y">
        © 2024 KicAir. All rights reserved.
      </footer>
    </main>
  );
}
