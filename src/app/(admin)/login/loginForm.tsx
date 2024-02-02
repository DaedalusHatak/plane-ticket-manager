"use client";
import { login } from "./serverActions";
import { Box, Button, CircularProgress, InputLabel, TextField,FormControl,OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import { useFormStatus } from "react-dom";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoginOutlinedInput, LoginTextField } from "@/src/components/muiStyled/textField";

export default function Form() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const { pending } = useFormStatus();


  

  return (
    <>

    <LoginTextField
        id="email"
        name="email"
        type="email"
        label="E-mail"
        InputLabelProps={{style:{color:"white",borderColor:"white"}}}
        color="secondary"
        variant="outlined"
        required
      />
      <FormControl>
        <InputLabel style={{color:"white"}} >Password</InputLabel>
        <LoginOutlinedInput  type={showPassword ? 'text' : 'password'}
        inputProps={{style:{color:"white",borderColor:"white"}}}
    color="secondary"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            label="Password"
            name="password"/>
      </FormControl>
      <Button type="submit"  sx={{height:60}} variant="contained">
        {pending ? <CircularProgress color="secondary" /> : "Log in"}
      </Button>
     

    </>
  );
}
