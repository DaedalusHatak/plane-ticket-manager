"use server";

import { EXPIRATION_TIME } from "@/src/globalValues";
import { sql } from "@vercel/postgres";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const handleInsertFlights = async (
  plane: Plane,
  tickets: string,
  prices: string[],
  origin: string,
  destination: string
) => {
  try {
    const pricesArrayString = `{${prices.join(",")}}`;
    await sql`INSERT INTO flights (plane,tickets_name,prices,origin,destination) values(${plane?.name},${tickets},${pricesArrayString},${origin}, ${destination})`;
    return true;
  } catch (e: any) {
    return e.message;
  }
};

export const handleFindingConnection = async (
  origin: string,
  destination: string
) => {
  try {
    const connections = await sql`
  SELECT *
  FROM flights
  WHERE 
    (${origin} = 'all-flights' OR origin = ${origin})
    AND
    (${destination} = 'all-flights' OR destination = ${destination});
`;
    return connections;
  } catch (e: any) {
    return e.message;
  }
};

export const handleSelectingSeat = async (flightCode:string,passList:PassengerDetails[],passId:string) => {

  try {

  passList.forEach(async({firstName,lastName,seat}) => {
    const fullName =firstName + " " + lastName;
    const connections = await sql`
    UPDATE seats
    SET is_taken = true, name = ${fullName}, uuid = ${passId}
    WHERE (seat_number =${seat}) AND (ticket_id =${flightCode})
    `
  })
return true;
  }
  catch(e){
    console.log(e)
    return false;
  }
}

export const updateCookie = async (passId:RequestCookie,ticketId:string) =>{
  const newExpiration = new Date();
  newExpiration.setMinutes(newExpiration.getMinutes() + EXPIRATION_TIME);
  if(passId){
    //TODO: UPDATE COOKIES
    cookies().set('passid',passId.value,{expires:newExpiration})

      sql`
      UPDATE basket
      SET date = ${newExpiration.toISOString()}
      WHERE (uuid =${passId.value}) AND (ticket_code =${ticketId})
      `
     }
}

export const deleteCookie = async (passId:RequestCookie,ticketId:string) =>{
  if(passId){
    //TODO: UPDATE COOKIES
    cookies().delete('passid')

      sql`
      DELETE FROM BASKET
      WHERE (uuid =${passId.value}) AND (ticket_code =${ticketId})
      `
     }
}