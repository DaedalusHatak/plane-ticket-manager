"use client";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { ChangeEvent, useState } from "react";

import Backdrop from "@mui/material/Backdrop";

import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { handleFlightForm } from "@/src/server-actions/handleFlightForm/handleFlightForm";
import { handleInsertFlights } from "@/src/server-actions/sql/serverActions";
import ShowListWrapper from "../../(global)/showListWrapper";
import PriceComponent from "./priceComp";
import { StyledFilledInput } from "@/src/utils/muiStyled/textField";
type AddPlane = {
  airports: Airport[];
  allPlanes: Plane[];
};
export default function AddPlane({ airports, allPlanes }: AddPlane) {
  //States
  const [plane, setPlane] = useState<Plane | null>();
  const [arrOfPrices, setArrOfPrices] = useState(Array(5).fill(0));
  const [tickets, setTickets] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorLabels, setErrorLabels] = useState<ErrorLabels>({
    origin: false,
    destination: false,
  });

  //Custom variables
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #3043f8",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  //Functions
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedPlane = allPlanes.find((e) => e.name === event.target.value);
    setPlane(selectedPlane);
  };
  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTickets(event.target.value.toUpperCase());
  };

  const handleSubmit = async (e: FormData) => {
    const data = await handleFlightForm(e, airports);
    console.log(data);
    if (data.isError.origin || data.isError.destination) {
      setErrorLabels({ origin: true, destination: true });
    } else if (data.targetLink.origin && data.targetLink.destination) {
      const insertFlight = await handleInsertFlights(
        plane!,
        tickets,
        arrOfPrices,
        data.targetLink!.origin?.toString(),
        data.targetLink!.destination?.toString()
      );

      if (typeof insertFlight === "string") {
        setOpen(true);

        setErrorMessage(insertFlight);
        throw new Error(insertFlight);
      }

      setArrOfPrices(Array(5).fill(0));
      setPlane(null);
      setTickets("");
    }
  };

  //HTML
  return (
    <section className=" z-10 bg-gradient-radial from-[#cfcfcf] to-100% to-[#bfbfbf]  flex flex-col  flex-1 w-full items-center justify-center py-3 px-3  overflow-hidden">
      <Box
        className="p-10 w-full max-w-5xl"
        color="primary"
        sx={{ minWidth: 120 }}
      >
        <h1 className="text-3xl pb-4">Add a new flight</h1>

        <form action={(e: FormData) => handleSubmit(e)}>
          <FormControl required={true} fullWidth>
            <InputLabel id="select-plane-id">Plane</InputLabel>
            <Select
              required
              labelId="select-plane-label"
              id="select-plane"
              value={plane ? plane.name : ""}
              label="Plane"
              onChange={handleChange}
            >
              {allPlanes.map((plane: Plane, index: number) => (
                <MenuItem key={index} value={plane.name}>
                  {plane.name}
                </MenuItem>
              ))}
            </Select>

            <StyledFilledInput
              sx={{ marginTop: "10px" }}
              required
              value={tickets}
              onChange={(e) => handleChangeInput(e)}
              id="ticket"
              label="Flight Code"
              variant="filled"
            />
            <Typography
              className="text-center pt-5"
              variant="h6"
              component="h2"
            >
              Set prices
            </Typography>
            <Box
              color="primary"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 12,
                justifyContent: "center",
                gap: 1,
                marginTop: 1,
                marginBottom: 5,
              }}
            >
              {arrOfPrices.map((price, idx) => (
                <PriceComponent
                  key={idx}
                  price={price}
                  idx={idx}
                  setArrOfPrices={setArrOfPrices}
                ></PriceComponent>
              ))}
            </Box>
            <ShowListWrapper
              errorLabels={errorLabels}
              setErrorLabels={setErrorLabels}
              airports={airports}
            ></ShowListWrapper>
          </FormControl>
        </form>
      </Box>
    </section>
  );
}
