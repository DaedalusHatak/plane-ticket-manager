"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function Loading(){
  return <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100svh"
  minWidth="100vw"
  bgcolor="#00000045"
  >
  <CircularProgress/>
  </Box>
}

export default function FlightList({
  query,
  connections,
}: {
  query: { origin: string; destination: string };
  connections: Flight[];
}) {
  const router = useRouter();
const [showLoading,setShowLoading] = useState(false)



if (showLoading) 
return <Loading/>


else return (
    <>
      <h1 className="text-xl w-full  py-7 px-[5%] bg-gradient-to-b from-blue-200 to-40% pt-12 to-[#f4f4f4]">
        All results for: {" "}
        <span className="font-bold">
        {query.origin==="all-flights" ? 'All airports' : query.origin} - {query.destination==="all-flights" ? 'All airports' : query.destination}
        </span>
      </h1>
      <div className=" w-full flex-grow h-full py-5 px-[5%] ">
        {connections.map((connection: any) => (
          <Link
          href={connection.tickets_name}
            className=" cursor-pointer relative mt-4 flex w-full py-2 sm:py-3 justify-between items-center bg-gradient-radial from-blue-100  to-indigo-100 shadow-lg border-2 border-slate-300 min-h-[82px] rounded-md"
            key={connection.id}
            onClick={e=>setShowLoading(true)}
          >
            <Typography className="absolute left-4 top-1/2 -translate-y-1/2">
              {connection.tickets_name}
            </Typography>
            <Typography className=" whitespace-pre flex-grow flex flex-col sm:flex-row  gap-2 items-center justify-center">
            <span className="flex-[1_1_100%] text-right font-semibold">{connection.origin}</span>
              <FlightIcon
              className="flex-[0_0_auto] w-fit"
                sx={{
                  rotate: "90deg",
                }}
              />
              <span className="flex-[1_1_100%] font-semibold">{connection.destination}</span>
            </Typography>
            <Typography className="absolute right-4 top-1/2 -translate-y-1/2">
              {connection.prices[4]}zł
            </Typography>
          </Link>
        ))}
      </div>
    </>
  )
}
