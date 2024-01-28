"use client";

import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";

export default function FindConnection() {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // router.push(link);
    router.push(`/flights/search?origin=${origin}&destination=${destination}`);
  };
  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    if (name === "origin") setOrigin(event.target.value);
    else if (name === "destination") setDestination(event.target.value);
  };
  return (
    <div className=" w-full max-w-4xl ">
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
    </div>
  );
}
