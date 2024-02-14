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
      <h1 className="text-xl w-full bg-red-200 py-7 px-[5%]">
        All results for: {" "}
        <span className="font-bold">
        {query.origin==="all-flights" ? 'All airports' : query.origin} - {query.destination==="all-flights" ? 'All airports' : query.destination}
        </span>
      </h1>
      <div className=" bg-green-400 w-full flex-grow h-full py-5 px-[5%]">
        {connections.map((connection: any) => (
          <Link
          href={connection.tickets_name}
            className=" cursor-pointer relative mt-4 flex w-full justify-between items-center bg-gray-300 min-h-[62px] rounded-md"
            key={connection.id}
            onClick={e=>setShowLoading(true)}
          >
            <Typography className="absolute left-4 text-xs md:text-base">
              {connection.tickets_name}
            </Typography>
            <Typography className=" whitespace-pre flex-grow flex items-center justify-center text-xs md:text-base">
              {" "}
              {connection.origin}{" "}
              <FlightIcon
                sx={{
                  rotate: "90deg",
                }}
              />
              {" " + connection.destination}
            </Typography>
            <Typography className="absolute right-4 text-xs md:text-base">
              {connection.prices[4]}zł
            </Typography>
          </Link>
        ))}
      </div>
    </>
  )
}
