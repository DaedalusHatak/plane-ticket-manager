"use client"

import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
  bgcolor="#00000045"
>
  <CircularProgress/>
</Box>;
}
