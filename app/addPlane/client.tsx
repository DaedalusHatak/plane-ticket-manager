"use client";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { Button, TextField, styled } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { handleInsertFlights } from "../serverActions";


const priceTags: string[] = [
  "XL Front",
  "Fast Exit",
  "Front",
  "XL Back",
  "Cheap",
];



function PriceComponent({
  price,
  idx,
  setArrOfPrices,
}: {
  idx: number;
  setArrOfPrices: Function;
  price: string;
}) {
  const [focus, setFocus] = useState(false);


  const handlePrices = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.value !== "") setFocus(true);
    console.log(e);
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setArrOfPrices((prev: string[]) => {
        const newArr = [...prev];
        newArr[index] = e.target.value;
        return newArr;
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        background: "rgba(0,0,0,0.06)",
        boxShadow: `0px 2px 2px ${grey[50]};`,
        borderRadius: "8px",

        height: "45px",
      }}
    >
      <BaseNumberInput
        required
        min={0}
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => (price === "" ? setFocus(false) : setFocus(true))}
        onChange={(e) =>
          handlePrices(e as React.ChangeEvent<HTMLInputElement>, idx)
        }
        className={`${"Mui-error" ? "border-red-600" : ""}`}
        onInputChange={(e) => handlePrices(e, idx)}
        slots={{
          root: StyledInputRoot,
          input: StyledInputElement,
        }}
        slotProps={{ input: { className: "placeholder-opacity-100" } }}
      ></BaseNumberInput>
      <label
        className={`text-gray-400 absolute pl-2 -z-10 transition-all peer-focus:top-0 ${
          focus === true
            ? "top-0  text-[12px]"
            : "top-[50%] translate-y-[-50%] text-[15px]"
        }`}
      >
        {priceTags[idx]} *
      </label>
    </Box>
  );
}

export default function BasicSelect({ allPlanes }: { allPlanes: Plane[] }) {
  const [plane, setPlane] = useState<Plane | null>();
  const [arrOfPrices, setArrOfPrices] = useState(Array(5).fill(""));
  const [tickets, setTickets] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedPlane = allPlanes.find((e) => e.name === event.target.value);
    setPlane(selectedPlane);
  };

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

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,name:string) => {
    if(name === "ticket") setTickets(event.target.value);
    else if (name === "origin")  setOrigin(event.target.value);
    else if (name === "destination")  setDestination(event.target.value);
  };

  const handleSubmit = async () => {
    const insertFlight = await handleInsertFlights(
      plane!,
      tickets,
      arrOfPrices,
      origin,
      destination,
    );
    if (typeof insertFlight === "string") {
      setOpen(true);
      const err = insertFlight
        .split("ERROR:")[1]
        .trim()
        .split("Caused by:")[0]
        .trim();

      setErrorMessage(err);
      throw new Error(insertFlight);
    }
  };

  return (
    <Box color="primary" sx={{ minWidth: 120 }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              color="red"
              component="h2"
            >
              Error
            </Typography>
            <Typography
              id="transition-modal-description"
              color="black"
              sx={{ mt: 2 }}
            >
              {errorMessage}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <form onSubmit={(e) => handleSubmit()}>
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

          <TextField
            required
            value={tickets}
            onChange={e => handleChangeInput(e,"ticket")}
            id="ticket"
            label="Flight Code"
            variant="filled"
          />

          <Box sx={{
            display:"flex"
          }}>
          <TextField
            required
            fullWidth
            value={origin}
            onChange={e => handleChangeInput(e,"origin")}
            id="origin"
            label="Origin"
            variant="filled"
          />
             <TextField
            required
            fullWidth
            value={destination}
            onChange={e => handleChangeInput(e,"destination")}
            id="destination"
            label="Destination"
            variant="filled"
          />
          </Box>
          <Typography className="text-center" variant="h6" component="h2">
            Set prices
          </Typography>
          <Box
            color="primary"
            sx={{
              maxWidth: 620,
              display: "flex",
              fontSize: 12,
              gap: 1,
              marginTop: 1,
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

          <Button
            type="submit"
            className="mt-3 bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: #000;
  height:100%;
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };
  display: grid;
  overflow: hidden;
  column-gap: 8px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  width: 100%;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
);

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};