// import {MongoClient} from "mongodb"
// import mongoose from "mongoose";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req:NextRequest,res:any){

    
//     try{
//         const db = await mongoose.connect(process.env.DB,{dbName:"Tickets"})
//       const collection = await db.connection.db;
//        const data = await collection.collection("seats").find().toArray();
//        console.log("Seats data:", data);
//       await mongoose.connection.close();
//         return NextResponse.json(data)
//     }
//     catch(e){
//         console.log(e)
//         throw new Error("Connection failed")
//     }
    

  
// }