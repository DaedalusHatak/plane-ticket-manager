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
    const connections = await sql`
  SELECT *
  FROM flights
  WHERE 
    (${origin} = 'all-flights' OR origin = ${origin})
    AND
    (${destination} = 'all-flights' OR destination = ${destination});
`;
    return connections;
  } catch (e: any) {
    return e.message;
  }
};

export const handleFlightForm = async (
  formData: FormData,
  airports: Airport[]
) => {
  const targetLink = {
    origin: formData.get("origin"),
    destination: formData.get("destination"),
  };
  const isError = { origin: false, destination: false };
  if (!targetLink.origin && !targetLink.destination) {
    isError.origin = true;
    isError.destination = true;
  } else {
    const checkOrigin =
      targetLink.origin === "All airports"
        ? airports
        : airports.filter(
            (airport: Airport) =>
              airport.airportname.toLowerCase() ===
              targetLink.origin?.toString().toLowerCase()
          );
    const checkDestination =
      targetLink.destination === "All airports"
        ? airports
        : airports.filter(
            (airport: Airport) =>
              airport.airportname.toLowerCase() ===
              targetLink.destination?.toString().toLowerCase()
          );

    if (targetLink.origin !== "All airports" && checkOrigin.length !== 1) {
      isError.origin = true;
    }

    if (
      targetLink.destination !== "All airports" &&
      checkDestination.length !== 1
    ) {
      isError.destination = true;
    } else {
      targetLink.origin =
        targetLink.origin === "All airports"
          ? "all-flights"
          : targetLink.origin;
      targetLink.destination =
        targetLink.destination === "All airports"
          ? "all-flights"
          : targetLink.destination;
    }
  }

  return { targetLink, isError };
};
