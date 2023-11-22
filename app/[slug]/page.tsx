import mongoose from "mongoose";
import Grid from "./grid";

async function getDb(col: string) {
  try {
    const mongo = await mongoose.connect(process.env.DB, { dbName: "Tickets" });
    const db = await mongo.connection.db;
    const collection = db.collection(col);
    const data = await collection.find().sort({ seatNumber: 1 }).toArray();
    const totalDocs = await collection.countDocuments();
    await mongoose.connection.close();
    return { data, totalDocs };
  } catch (e) {
    console.log(e);
    throw new Error("Connection failed");
  }
}

export default async function Home({ params }: { params: { slug: string } }) {
  const { data, totalDocs } = await getDb(params.slug.toUpperCase());

  return (
    <main className="flex  min-h-screen flex-col items-center  px-6">
      <h1 className="pb-12 text-4xl">Select your seat</h1>

      <Grid data={data}></Grid>
    </main>
  );
}
