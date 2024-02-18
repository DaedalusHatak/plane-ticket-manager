import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import SearchConnection from "../components/(user)/home/searchConnection";
import Modal from "../components/(global)/modal";
import CardWrapper from "../components/(user)/home/cardWrapper";
import DealsCard from "../components/(user)/home/dealsCard";

export default async function Home() {
  noStore();
  const { rows: airports } = await sql`SELECT * from airports`;

  return (
    <main className="flex text-black  min-h-screen flex-col items-center py-3 px-3 ">
      <Modal></Modal>
      <h1 className="text-3xl font-semibold">Find connection</h1>
      <SearchConnection airports={airports as Airport[]}></SearchConnection>
      <DealsCard></DealsCard>
      <h1 className="text-3xl font-semibold mt-28 mb-5">Why choose KicAir</h1>
      <CardWrapper></CardWrapper>
    </main>
  );
}
