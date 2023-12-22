"use server"

import { sql } from "@vercel/postgres";

export const handleInsertFlights = async (plane:Plane,tickets:string) => {
    try{
      await sql`INSERT INTO flights (plane,tickets_name) values(${plane?.name},${tickets})`;
      return true;
    }catch(e:any){
      return e.message;
    }
  
  }