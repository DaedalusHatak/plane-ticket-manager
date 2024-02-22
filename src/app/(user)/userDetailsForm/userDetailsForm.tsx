"use client";

import { StyledFilledInput } from "@/src/utils/muiStyled/textField";

export default function UserDetailsForm() {
  return (
    <form action="">
      <StyledFilledInput
        fullWidth
        autoComplete="off"
        id="origin"
        name="origin"
        label="Name"
        variant="filled"
      />
      <StyledFilledInput
        fullWidth
        autoComplete="off"
        id="origin"
        name="origin"
        label="Surname"
        variant="filled"
      />
      <StyledFilledInput
        fullWidth
        autoComplete="off"
        id="origin"
        name="origin"
        label="Title"
        variant="filled"
      />
    </form>
  );
}
