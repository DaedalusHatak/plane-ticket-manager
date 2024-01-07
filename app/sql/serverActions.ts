"use server";

import { sql } from "@vercel/postgres";

export const handleInsertFlights = async (
  plane: Plane,
  tickets: string,
  prices: string[]
) => {
  try {
    const pricesArrayString = `{${prices.join(",")}}`;
    await sql`INSERT INTO flights (plane,tickets_name,prices) values(${plane?.name},${tickets},${pricesArrayString})`;
    return true;
  } catch (e: any) {
    return e.message;
  }
};
