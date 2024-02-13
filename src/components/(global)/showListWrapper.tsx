"use client";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ShowList from "./showList";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
type ShowListWrapper = {
  airports:Airport[];
  errorLabels:ErrorLabels;
  setErrorLabels:Dispatch<SetStateAction<ErrorLabels>>
  showAll?:boolean;
}

export default function ShowListWrapper({
  airports,
  errorLabels,
  setErrorLabels,
  showAll,
}: ShowListWrapper) {
  const destinationRef = useRef<HTMLInputElement>(null);
  const originRef = useRef<HTMLInputElement>(null);
  const [originLabel, setOriginLabel] = useState("Origin");
  const [destinationLabel, setDestinationLabel] = useState("Destination");
  const containerRef = useRef<HTMLDivElement>(null);
  const { pending } = useFormStatus();
  const [filterCountries, setFilterCountries] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>("");
  const [currentTarget, setCurrentTarget] = useState("");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (errorLabels.origin || errorLabels.destination) {
      setOriginLabel(
        errorLabels.origin ? "Please select departure airport" : "Origin"
      );
      setDestinationLabel(
        errorLabels.destination
          ? "Please select arrival airport"
          : "Destination"
      );
      setOrigin(errorLabels.origin ? "" : origin);
      setDestination(errorLabels.destination ? "" : destination);
      setErrorLabels({ origin: false, destination: false });
    }
    if (!pending) {
      setOrigin("");
      setDestination("");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [errorLabels, pending]);

  const handleClickOutside = (e: any) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowList(false);
    }
  };

  const handleTargetChange = (e: any, newTarget: any) => {
    setShowList(true);
    setCurrentTarget(newTarget);

    setFilterCountries(e.target.value);
    newTarget === "origin"
      ? setOriginLabel("Origin")
      : setDestinationLabel("Destination");
  };

  const handleAirportList = (e: any, setTarget: any) => {
    if (currentTarget === "origin") {
      setOrigin(setTarget === "all-flights" ? "All airports" : setTarget);
      setFilterCountries(setTarget);
      if (!destination) {
        setCurrentTarget("destination");
        if (destinationRef.current) {
          destinationRef.current.focus();
        }
        setFilterCountries("");
        return;
      }
    } else {
      setDestination(setTarget === "all-flights" ? "All airports" : setTarget);
      setFilterCountries(setTarget);
      if (!origin) {
        setCurrentTarget("origin");
        if (originRef.current) {
          originRef.current.focus();
        }

        setFilterCountries("");
        return;
      }
    }
  };

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.id === "origin") setOrigin(event.target.value);
    else if (event.target.id === "destination")
      setDestination(event.target.value);

    setFilterCountries(event.target.value);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      ref={containerRef}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <TextField
          fullWidth
          inputRef={originRef}
          value={origin}
          onChange={(e) => handleChangeInput(e)}
          autoComplete="off"
          onFocus={(e) => handleTargetChange(e, "origin")}
          id="origin"
          name="origin"
          label={originLabel}
          variant="filled"
        />
        <TextField
          fullWidth
          inputRef={destinationRef}
          value={destination}
          tabIndex={2}
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          onFocus={(e) => handleTargetChange(e, "destination")}
          id="destination"
          name="destination"
          label={destinationLabel}
          variant="filled"
        />
      </Box>

      <Button
        type="submit"
        className=" bg-blue-500 h-11 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
        variant="contained"
        tabIndex={3}
        onClick={e =>    setShowList(false)}
        endIcon={pending ? null : <SendIcon />}
      >
        {pending ? <CircularProgress /> : "Send"}
      </Button>
      {showList && (
        <ShowList
          allAirports={showAll}
          setFilterCountries={setFilterCountries}
          filterCountries={filterCountries}
          airports={airports}
          onClick={handleAirportList}
        />
      )}
    </Box>
  );
}
