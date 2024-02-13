import { useEffect, useRef, useState } from "react";
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from "@mui/base/Unstable_NumberInput";
import { Box, styled } from "@mui/material";



  
  export default function PriceComponent({
    price,
    idx,
    setArrOfPrices,
  }: {
    idx: number;
    setArrOfPrices: Function;
    price: number | undefined;
  }) {
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const priceTags: string[] = [
        "XL Front",
        "Fast Exit",
        "Front",
        "XL Back",
        "Cheap",
      ];

    const handlePrices = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.target.value !== "") setFocus(true);
  
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setArrOfPrices((prev: number[]) => {
          const newArr = [...prev];
          newArr[index] = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
          return newArr;
        });
      }
    };
  
    useEffect(() => {
      if (price === 0) setFocus(false);
    }, [price]);
  
    return (
      <Box
        sx={{
          position: "relative",
          background: "rgba(0,0,0,0.06)",
          borderRadius: "8px",
          maxWidth: "100px",
          height: "45px",
        }}
      >
        <BaseNumberInput
          required
          min={0}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => (price === 0 ? setFocus(false) : setFocus(true))}
          onChange={(e) =>
            handlePrices(e as React.ChangeEvent<HTMLInputElement>, idx)
          }
          inputRef={inputRef}
          value={price}
          endAdornment={"zł"}
          className={`${"Mui-error" ? "border-red-600" : ""}`}
          onInputChange={(e) => handlePrices(e, idx)}
          slots={{
            root: StyledInputRoot,
            input: StyledInputElement,
          }}
          slotProps={{
            input: {
              className: "placeholder-opacity-100",
              value: price ? price : "",
            },
          }}
        ></BaseNumberInput>
        <label
          className={`text-gray-600 absolute pl-2 z-1 transition-all peer-focus:top-0 ${
            focus === true
              ? "top-0 text-[10px] md:text-[12px]"
              : "top-[50%] translate-y-[-50%] text-[10px] md:text-[15px]"
          }`}
        >
          {priceTags[idx]} *
        </label>
      </Box>
    );
  }
  //CSS variables
const StyledInputRoot = styled("div")(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    border-radius: 8px;
    color: #000;
    height:100%;
    display: grid;
    grid-template-columns: 90% 10%;
    overflow: hidden;
    column-gap: 3px;
    align-items: baseline;
    padding-right:8px;
  
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
    z-index:5;
  `
  );
  
  const blue = {
    200: "#80BFFF",
    400: "#3399FF",
    600: "#0072E5",
  };
  
  const grey = {
    300: "#C7D0DD",
    900: "#1C2025",
  };
  