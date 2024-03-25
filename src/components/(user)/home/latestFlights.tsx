"use client";

import { Typography } from "@mui/material";
import Link from "next/link";
import FlightIcon from "@mui/icons-material/Flight";
import { useState } from "react";
import UserDetailsForm from "@/src/components/(user)/userDetailsForm/userDetailsForm";
import FlightList from "../flightList";

export default function LatestFlights(flights: any) {
  const [showLoading, setShowLoading] = useState(false);
  const [forward, setForward] = useState("");
  return (
    <>
     <FlightList card={true} flights={flights.flights}/>
    </>
  );
}