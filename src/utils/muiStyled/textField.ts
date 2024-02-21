import { OutlinedInput, TextField,Button, styled } from "@mui/material";



export const ButtonBlue = styled(Button)({

  "&.MuiButton-root": {
    "&:hover":{
     backgroundColor:"#016a80"
    }


}
   
	

  
});


export const StyledFilledInput = styled(TextField)({
  "&.MuiTextField-root":{
   "& .MuiFilledInput-root":{
    "&:hover":{
      backgroundColor:'#64748b8c'
    }
   }
  }
})

export const LoginOutlinedInput = styled(OutlinedInput)({
  "&.MuiOutlinedInput-root ": {
    "& input:-webkit-autofill":{
      "-webkit-text-fill-color": "#fff",
      "caret-color": '#fff'
     },
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
    "& input:-webkit-autofill":{
     "-webkit-text-fill-color": "#fff",
     "caret-color": '#fff'
    },
      "& .MuiOutlinedInput-notchedOutline":{
       borderColor: "#fb923c"
      },
      "&:hover fieldset":{
       borderColor:"#fb923c",
       borderWidth:"0.15rem",
      }}
  
})