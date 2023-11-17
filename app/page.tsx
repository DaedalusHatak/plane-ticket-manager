import mongoose from "mongoose";
import Grid from "./grid";

async function getDb(col:string){

    
    try{
        const mongo = await mongoose.connect(process.env.DB,{dbName:"Tickets"})
      const db = await mongo.connection.db;
      const collection = db.collection(col)
       const data = await collection.find().toArray();
       const totalDocs = await collection.countDocuments();
      await mongoose.connection.close();
        return {data,totalDocs}
    }
    catch(e){
        console.log(e)
        throw new Error("Connection failed")
    }
    

  
}

export default async function Home() {
const {data,totalDocs }= await getDb("tester");

  return (
    <main className="flex  min-h-screen flex-col items-center  px-6">
    <h1>Hello world</h1>
    
    {totalDocs}
<Grid data={data}></Grid>
    </main>
  )}
