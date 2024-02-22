"use client";
import { Box, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ShowList from "./showList";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { StyledFilledInput } from "@/src/utils/muiStyled/textField";
import { ButtonBlue } from "@/src/utils/muiStyled/button";
type ShowListWrapper = {
  airports: Airport[];
  errorLabels: ErrorLabels;
  setErrorLabels: Dispatch<SetStateAction<ErrorLabels>>;
  showAll?: boolean;
};

export default function ShowListWrapper({
  airports,
  errorLabels,
  setErrorLabels,
  showAll,
}: ShowListWrapper) {
  const originLabel = errorLabels.origin
    ? "Please select departure airport"
    : "Origin";
  const destinationLabel = errorLabels.destination
    ? "Please select arrival airport"
    : "Destination";
  const destinationRef = useRef<HTMLInputElement>(null);
  const originRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { pending } = useFormStatus();

  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [currentTarget, setCurrentTarget] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setCurrentTarget("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    if (!pending) {
      setOrigin("");
      setDestination("");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pending]);

  const handleTargetChange = (newTarget: string) => {
    setCurrentTarget(newTarget);

    if (errorLabels.origin && newTarget === "origin") {
      setErrorLabels({ ...errorLabels, origin: false });
    } else if (errorLabels.destination && newTarget === "destination") {
      setErrorLabels({ ...errorLabels, destination: false });
    }
  };

  const handleAirportList = (setTarget: string) => {
    const targetStateSetter =
      currentTarget === "origin" ? setOrigin : setDestination;
    const airport = setTarget === "all-flights" ? "All airports" : setTarget;
    targetStateSetter(airport);
    if (
      currentTarget === "origin" &&
      destinationRef.current &&
      !destinationRef.current.value
    )
      destinationRef.current.focus();
    else if (
      currentTarget === "destination" &&
      originRef.current &&
      !originRef.current?.value
    )
      originRef.current.focus();
  };

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.id === "origin") setOrigin(event.target.value);
    else if (event.target.id === "destination")
      setDestination(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "15px",
        flexDirection: "column",
        position: "relative",
      }}
      ref={containerRef}
    >
      <Box
        sx={{
          display: "flex",
          gap: "5px",
        }}
      >
        <StyledFilledInput
          fullWidth
          inputRef={originRef}
          value={origin}
          onChange={(e) => handleChangeInput(e)}
          autoComplete="off"
          onFocus={(e) => handleTargetChange("origin")}
          id="origin"
          name="origin"
          label={originLabel}
          variant="filled"
        />
        <StyledFilledInput
          fullWidth
          inputRef={destinationRef}
          value={destination}
          tabIndex={2}
          autoComplete="off"
          onChange={(e) => handleChangeInput(e)}
          onFocus={(e) => handleTargetChange("destination")}
          InputProps={{
            onFocus: (e) => handleTargetChange("destination"),
          }}
          id="destination"
          name="destination"
          label={destinationLabel}
          variant="filled"
        />
      </Box>

      <ButtonBlue
        type="submit"
        className="h-11 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
        variant="contained"
        tabIndex={3}
        onClick={(e) => setCurrentTarget("")}
        endIcon={pending ? null : <SendIcon />}
      >
        {pending ? <CircularProgress color="secondary" /> : "Send"}
      </ButtonBlue>
      {currentTarget && (
        <ShowList
          allAirports={showAll}
          key={currentTarget === "origin" ? origin : destination}
          filterInput={currentTarget === "origin" ? origin : destination}
          airports={airports}
          onClick={handleAirportList}
        />
      )}
    </Box>
  );
}
