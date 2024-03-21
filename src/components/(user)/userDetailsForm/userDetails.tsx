"use client";
import { StyledFilledInput } from "@/src/utils/muiStyled/textField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function FunctionName({ id }: any) {
  const [title, setTitle] = useState("");

  return (
    <div className="flex gap-5 max-w-2xl">
      <FormControl id="title-element" required sx={{ width: 120 }}>
        <InputLabel id="title-id">Title</InputLabel>
        <Select
          required
          labelId="title-label"
          id={`title` + id}
          name={`title` + id}
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        >
          <MenuItem id="mr" value="Mr">
            Mr
          </MenuItem>
          <MenuItem id="mrs" value="Mrs">
            Mrs
          </MenuItem>
          <MenuItem id="ms" value="Ms">
            Ms
          </MenuItem>
        </Select>
      </FormControl>
      <StyledFilledInput
        required
        autoComplete="off"
        id={`first-name-` + id}
        name={`first-name-` + id}
        label="First Name"
        variant="filled"
      />
      <StyledFilledInput
        required
        autoComplete="off"
        id={`last-name-` + id}
        name={`last-name-` + id}
        label="Last Name"
        variant="filled"
      />
    </div>
  );
}
