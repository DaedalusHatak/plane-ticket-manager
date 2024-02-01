"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { login } from "./serverActions";
import { Box, Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { nextTick } from "process";
import { useFormStatus } from "react-dom";
import { red } from "@mui/material/colors";
import { theme } from "@/src/utils/theme/theme";


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


  const styles = (theme:any) => ({
  
    notchedOutline: {
      borderWidth: '1px',
      borderColor: 'green !important'
    },
  
  });
  

  return (
    <>

    <TextField
        id="email"
        name="email"
        type="email"
        label="E-mail"
        InputLabelProps={{style:{color:"white",borderColor:"white"}}}
        color="secondary"
        variant="outlined"
        required
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        InputLabelProps={{style:{color:"white",borderColor:"white"}}}
        color="secondary"
        variant="outlined"
        required
      />
      <Button type="submit" formAction={handleSubmit} sx={{height:60}} variant="contained">
        {pending ? <CircularProgress color="secondary" /> : "Log in"}
      </Button>
     

    </>
  );
}
