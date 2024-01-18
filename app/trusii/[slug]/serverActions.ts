"use server"
import mongoose from "mongoose";

export async function changeSeat(element:SeatMongo,updatedElement:SeatMongo) {

    



    const mongo = await mongoose.connect(process.env.DB, { dbName: 'Tickets' });
    const db = await mongo.connection.db;
    const collection = db.collection("START");
  
if(element.isTaken){
  return;
}
    await collection.updateMany(
        {name: updatedElement.name},
        {$set: {isTaken:false},
    $unset: {name: 1}}

      )

    await collection.updateOne(
        { seatNumber: element.seatNumber },
        {
          $set: {
            name: updatedElement.name,
            isTaken: true,
            // Add or modify other properties as needed
          }
        }
      );
return updatedElement;

    }