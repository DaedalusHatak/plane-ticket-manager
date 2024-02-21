import ShowListWrapper from "@/src/components/(global)/showListWrapper";
import FlightList from "@/src/components/(user)/flight-search/flightList";
import SearchConnection from "@/src/components/(user)/home/searchConnection";
import { handleFindingConnection } from "@/src/server-actions/sql/serverActions";
import { Box, Typography } from "@mui/material";
import { sql } from "@vercel/postgres";

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
  const origin = searchParams.origin
  const destination = searchParams.destination
  const con = await handleFindingConnection(origin, destination);
  const connections = con.rows;
  const { rows: airports } = await sql`SELECT * from airports`;
  return (
    <main className="flex  text-black  min-h-screen flex-col items-center">
     <div className="w-full  flex justify-center  px-12 pt-12 bg-blue-200">
     <SearchConnection airports={airports as Airport[]}></SearchConnection>
     </div>
      {con.rows.length > 0 ? (
        <FlightList query={searchParams} connections={connections}></FlightList>
      ) : (
        <Box
        className="bg-gradient-to-b from-blue-200 to-5% pt-12 to-[#f4f4f4]"
          sx={{
            display: "flex",
            flexGrow: "1",
            alignItems: "center",
            height: "100%",
            width:"100%"
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
