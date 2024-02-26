"use client"

import UserDetailsForm from "@/src/app/(user)/userDetailsForm/userDetailsForm";
import { Typography } from "@mui/material";
import { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";


export default function FlightList({flights,card}:any){
    const [showLoading, setShowLoading] = useState(false);
    const [forward, setForward] = useState("");
    const classes = card ? ["max-w-5xl flex justify-center gap-5 flex-wrap","flex-wrap flex-1 min-w-44 max-w-72 px-8 py-14","top-3 left-1/2 -translate-x-1/2","","bottom-3 left-1/2 -translate-x-1/2"] : ["flex-grow h-full  py-5 px-[5%]","w-full py-2 sm:py-3","left-4 top-1/2 -translate-y-1/2","sm:flex-row","right-4 top-1/2 -translate-y-1/2"]


    return (
        <>

      <div className={"w-full " + classes[0]}>
      {forward && (
          <UserDetailsForm setForward={setForward} forward={forward} />
        )}
        {flights.map((flight: any) => (
          <div
            className={"hover:to-[#64748b8c] cursor-pointer min-h-[82px] rounded-md relative mt-4 flex  justify-between items-center bg-gradient-radial from-blue-100  to-indigo-100 shadow-2xl border-2 border-slate-300 " + classes[1]}
            key={flight.id}
            onClick={(e) => setForward(flight.tickets_name)}
          >
            <Typography
              className={"absolute " + classes[2]} 
              fontSize={17}
            >
              {flight.tickets_name}
            </Typography>
            <Typography className={" whitespace-pre flex-grow flex flex-col gap-2 items-center justify-center " + classes[3]} >
              <span className="flex-[1_1_100%] text-right font-semibold">
                {flight.origin}
              </span>
              <FlightIcon
                className="flex-[0_0_auto] w-fit"
                sx={{
                  rotate: "90deg",
                }}
              />
              <span className="flex-[1_1_100%] font-semibold">
                {flight.destination}
              </span>
            </Typography>
            <Typography className={"absolute " + classes[4]}>
              {flight.prices[4]}zł
            </Typography>
          </div>
        ))}
      </div>
        </>
    )
}
