"use server"
import { sql } from "@vercel/postgres";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function updateBasket(date:Date,uuid:string,passengerList:any,ticketCode:string){
  console.log("updateBasket")
    try {
        const connections = await sql`
        INSERT INTO basket (passenger_list,uuid,date,ticket_code)
        Values (${JSON.stringify(passengerList)},${uuid},${date.toISOString()},${ticketCode})
   
    `;
        return connections;
      } catch (e: any) {
        return e.message;
      }

}


export async function deleteFromBasket(passId:string,ticketId:string){
  sql`DELETE FROM basket WHERE (uuid =${passId}) AND (ticket_id =${ticketId})`
}