"use client";
import { createTheme } from "@mui/material/styles";
import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    white: string;
    lightRed: string;
    red: string;
    offBlack: string;
  }
}
declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }
}
export const theme = createTheme({
  palette: {
    white: { main: "#fff" },
    primary: {
      main: "#00a2c4",
      dark: "68cbff",
    },
    secondary: {
      main: "#fb923c",
    },
    success: {
      main: "#00f85f",
    },
    warning: { main: "#fca5a5" },
    error: { main: "#e11d48" },
    info: { main: "#0091ff" },
  },
});
