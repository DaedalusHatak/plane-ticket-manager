"use client";

import { Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { handleFindingConnection } from "./serverActions";
import FlightIcon from "@mui/icons-material/Flight";
export default function FindConnection() {
  const [connections, setConnections] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const con = await handleFindingConnection(origin, destination);
    console.log(con);
    if (con.rowCount > 0) {
      setConnections(con.rows);
      setError("");
    } else {
      setConnections(con.rows);
      setError("No connections found");
    }
  };

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    if (name === "origin") setOrigin(event.target.value);
    else if (name === "destination") setDestination(event.target.value);
  };
  return (
    <div className="w-full max-w-4xl ">
      <form className="grid grid-cols-2" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => handleChangeInput(e, "origin")}
          value={origin}
          id="origin"
          label="Origin"
          variant="filled"
        />
        <TextField
          onChange={(e) => handleChangeInput(e, "destination")}
          value={destination}
          id="destination"
          label="Destination"
          variant="filled"
        />
        <Button
          type="submit"
          className="col-span-2 mt-3 bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Search
        </Button>
      </form>

      <Typography mt={3} fontSize={25} align="center" color={"#f00"}>
        {error}
      </Typography>
      {connections.length > 0 &&
        connections.map((connection: any) => (
          <div
            className="relative mt-4 flex w-full justify-between items-center bg-gray-300 min-h-[62px] rounded-md"
            key={connection.id}
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
  );
}
