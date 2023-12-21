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
    return { data};
  } catch (e) {
    console.log(e);
    throw new Error("Connection failed");
  }
}

export default async function Home() {


  const { data} = await getDb("START");
  const newChunkedArray = []
  for (let i = 0; i < data.length; i += 6) {
    const chunk = data.slice(i, i + 6);
    newChunkedArray.push(
      ...chunk.slice(0, 3),
      Math.floor(i / 6) + 1,
      ...chunk.slice(3)
    );
  }
  return (
    <main className="flex text-black min-h-screen flex-col items-center  px-3">
      <h1 className="pb-12 text-4xl">Select your seat</h1>
      
      <Grid data={JSON.parse(JSON.stringify(newChunkedArray))}></Grid>
    </main>
  );
}
