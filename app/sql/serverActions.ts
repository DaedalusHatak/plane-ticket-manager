"use server"

import { sql } from "@vercel/postgres";

export const handleInsertFlights = (plane:Plane,tickets:string) => {
    "use server"
    sql`INSERT INTO flights (plane,tickets_name,prices) values(${plane?.name},${tickets})`;
  }