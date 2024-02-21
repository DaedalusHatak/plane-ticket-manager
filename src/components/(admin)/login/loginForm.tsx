"use client";

import { Button, CircularProgress, InputLabel,FormControl, InputAdornment, IconButton } from "@mui/material";
import {  useState } from "react";

import { useFormStatus } from "react-dom";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoginOutlinedInput, LoginTextField } from "@/src/utils/muiStyled/textField";

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
        InputLabelProps={{style:{color:"#fff",borderColor:"#fff"}}}
        InputProps={{style:{color:"#fff"}}}
        color="secondary"
        variant="outlined"
        required
      />
      <FormControl>
        <InputLabel style={{color:"#fff"}} >Password</InputLabel>
        <LoginOutlinedInput  type={showPassword ? 'text' : 'password'}
        inputProps={{style:{color:"#fff",borderColor:"#fff"}}}
    color="secondary"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  color="secondary"
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
