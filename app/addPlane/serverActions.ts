"use server"

import mongoose from "mongoose";

function generateSeatNumber(row:number, col:number) {
    const rowLabel = String.fromCharCode('A'.charCodeAt(0) + row);
    const colLabel = (col % 6 === 0 ? 6 : col % 6).toString(); // Ensure col does not exceed 6
    return `${rowLabel}${colLabel}`;
  }


  
export async function handleSubmit(name:string,seatNumber:number,rowSeats:number){

    
    const db = await mongoose.connect(process.env.DB,{dbName:"Tickets"})
    const collection =  db.connection.db;
    const newCollection = await collection.createCollection(name)
    
    const documents = [];

    for (let i = 1; i <= seatNumber; i++) {
        const currentRow = Math.floor((i-1) / rowSeats);
        const currentCol = i % rowSeats === 0 ? rowSeats : i % rowSeats;
        documents.push({
          seatNumber: generateSeatNumber(currentRow, currentCol),
          isTaken: false,
          // other seat information
        });
      }
      await newCollection.insertMany(documents)

    await mongoose.connection.close();

}