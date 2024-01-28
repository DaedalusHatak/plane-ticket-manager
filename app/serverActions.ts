"use server";

import { sql } from "@vercel/postgres";

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
    const connections =
      await sql`SELECT * FROM flights WHERE origin = ${origin} AND destination = ${destination}`;
    return connections;
  } catch (e: any) {
    return e.message;
  }
};
