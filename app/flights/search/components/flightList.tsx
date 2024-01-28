"use client";
import { Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import { useRouter } from "next/navigation";

export default function FlightList({
  query,
  connections,
}: {
  query: { origin: string; destination: string };
  connections: Flight[];
}) {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(`/${link}`);
  };
  return (
    <>
      <h1 className="text-xl w-full bg-red-200 py-7 px-[5%]">
        All results for{" "}
        <span className="font-bold">
          {query.origin}-{query.destination}
        </span>
      </h1>
      <div className=" bg-green-400 w-full flex-grow h-full py-5 px-[5%]">
        {connections.map((connection: any) => (
          <div
            className=" cursor-pointer relative mt-4 flex w-full justify-between items-center bg-gray-300 min-h-[62px] rounded-md"
            key={connection.id}
            onClick={(e) => handleClick(connection.tickets_name)}
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
          </div>
        ))}
      </div>
    </>
  );
}
