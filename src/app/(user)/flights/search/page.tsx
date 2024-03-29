import ShowListWrapper from "@/src/components/(global)/showListWrapper";
import FlightSearch from "@/src/components/(user)/flight-search/flightSearch";
import SearchConnection from "@/src/components/(user)/home/searchConnection";
import { handleFindingConnection } from "@/src/server-actions/sql/serverActions";
import { Box, Typography } from "@mui/material";
import { sql } from "@vercel/postgres";

export default async function Page({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams?: any;
}) {
  const origin = searchParams.origin;
  const destination = searchParams.destination;
  const con = await handleFindingConnection(origin, destination);
  const connections = con.rows;
  const { rows: airports } = await sql`SELECT * from airports`;
  return (
    <main className="flex  text-black  min-h-svh flex-col items-center">
      <div className="w-full  flex justify-center  px-12 pt-12 bg-blue-200">
        <SearchConnection airports={airports as Airport[]}></SearchConnection>
      </div>
      {con.rows.length > 0 ? (
        <FlightSearch query={searchParams} connections={connections}></FlightSearch>
      ) : (
        <Box
          className="bg-gradient-to-b from-blue-200 to-5% pt-12 to-[#f4f4f4]"
          sx={{
            display: "flex",
            flexGrow: "1",
            alignItems: "center",
            height: "100%",
            width: "100%",
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
