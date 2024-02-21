"use client"

import { Typography } from "@mui/material"
import Link from "next/link"
import FlightIcon from "@mui/icons-material/Flight";
import { useState } from "react";

export default function LatestFlights(flights:any){
    const [showLoading,setShowLoading] = useState(false)
    return(
        <>

        <div className="w-full max-w-5xl flex justify-center gap-5 flex-wrap ">
            {flights.flights.map((flight:any)=> (
               
                      <Link
          href={flight.tickets_name}
            className=" cursor-pointer min-h-[82px] rounded-md relative mt-4 flex flex-wrap flex-1 min-w-44 px-8 py-14 justify-between items-center bg-gradient-radial from-blue-100  to-indigo-100 shadow-2xl border-2 border-slate-300 "
            key={flight.id}
            onClick={e=>setShowLoading(true)}
          >
            <Typography className="absolute top-3 left-1/2 -translate-x-1/2" fontSize={17}>
              {flight.tickets_name}
            </Typography>
            <Typography className=" whitespace-pre flex-grow flex flex-col   gap-2 items-center justify-center">
            <span className="flex-[1_1_100%] text-right font-semibold">{flight.origin}</span>
              <FlightIcon
              className="flex-[0_0_auto] w-fit"
                sx={{
                  rotate: "90deg",
                }}
              />
              <span className="flex-[1_1_100%] font-semibold">{flight.destination}</span>
            </Typography>
            <Typography className="absolute bottom-3   left-1/2 -translate-x-1/2"  >
              {flight.prices[4]}zł
            </Typography>
          </Link>
           
            ))}
        </div>
        </>
    )
}