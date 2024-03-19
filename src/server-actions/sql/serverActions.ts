"use server";

import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

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
console.log(cookies())

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