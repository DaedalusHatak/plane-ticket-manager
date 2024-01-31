"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { login } from "./serverActions";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { nextTick } from "process";
import { useFormStatus } from "react-dom";

export default function Form() {
  const { pending } = useFormStatus();
  const handleSubmit = async (formData: FormData) => {
    try {
      const info = await login(formData);
      console.log(info);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false)
    }
  };

  return (
    <>
      <TextField
        id="email"
        name="email"
        type="email"
        label="E-mail"
        variant="outlined"
        required
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        required
      />
      <Button type="submit" formAction={handleSubmit} variant="contained">
        {pending ? <CircularProgress color="secondary" /> : "Log in"}
      </Button>
    </>
  );
}
