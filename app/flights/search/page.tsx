import { handleFindingConnection } from "@/app/serverActions";

import FlightList from "./components/flightList";
import { Box, Typography } from "@mui/material";

function capitalizeText(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams?: any;
}) {
  const origin = capitalizeText(searchParams.origin);
  const destination = capitalizeText(searchParams.destination);
  const con = await handleFindingConnection(origin, destination);
  const connections = con.rows;

  return (
    <main className="flex  text-black  min-h-screen flex-col items-center">
      {con.rows.length > 0 ? (
        <FlightList query={searchParams} connections={connections}></FlightList>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            className="h-full flex-grow "
            sx={{
              alignSelf: "center",
              verticalAlign: "center",
            }}
            fontSize={25}
            align="center"
            color={"#f00"}
          >
            No connection found
          </Typography>
        </Box>
      )}
    </main>
  );
}
