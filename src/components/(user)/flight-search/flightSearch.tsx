"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import UserDetailsForm from "@/src/components/(user)/userDetailsForm/userDetailsForm";
import FlightList from "../flightList";
function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100svh"
      minWidth="100vw"
      bgcolor="#00000045"
    >
      <CircularProgress />
    </Box>
  );
}

export default function FlightSearch({
  query,
  connections,
}: {
  query: { origin: string; destination: string };
  connections: Flight[];
}) {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [forward, setForward] = useState("");

  if (showLoading) return <Loading />;
  else
    return (
      <>
        <div
          className={`w-full ${
            forward ? "max-h-[calc(100svh-10.1875rem)] overflow-hidden" : ""
          }`}
        >
          <h1 className="text-xl w-full  py-7 px-[5%] bg-gradient-to-b from-blue-200 to-40% pt-12 to-[#f4f4f4]">
            All results for:{" "}
            <span className="font-bold">
              {query.origin === "all-flights" ? "All airports" : query.origin} -{" "}
              {query.destination === "all-flights"
                ? "All airports"
                : query.destination}
            </span>
          </h1>
         <FlightList flights={connections} />
        </div>
      </>
    );
}
