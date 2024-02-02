import { OutlinedInput, TextField, styled } from "@mui/material";

export const LoginOutlinedInput = styled(OutlinedInput)({
  "&.MuiOutlinedInput-root ": {
   "& .MuiOutlinedInput-notchedOutline":{
    borderColor: "#fb923c"
   },
   "&:hover fieldset":{
    borderColor:"#fb923c",
    borderWidth:"0.15rem",
   }
  },
 
})

export const LoginTextField = styled(TextField)({
  "&.MuiTextField-root ": {

      "& .MuiOutlinedInput-notchedOutline":{
       borderColor: "#fb923c"
      },
      "&:hover fieldset":{
       borderColor:"#fb923c",
       borderWidth:"0.15rem",
      }}
  
})