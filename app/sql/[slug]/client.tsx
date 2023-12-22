"use client"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, useState } from 'react';
import { Button, Input, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { StyledEngineProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';


import { handleInsertFlights } from './serverActions';
export default function BasicSelect({allPlanes}:{allPlanes: Plane[]}) {
  const [plane, setPlane] = useState<Plane | null>();
  const [tickets, setTickets] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedPlane = allPlanes.find((e) => e.name === event.target.value)
    setPlane(selectedPlane);
  };

  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #3043f8',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTickets(event.target.value);
  
  };

const  handleSubmit = async () => {
  const insertFlight = await handleInsertFlights(plane!,tickets);
  if(typeof insertFlight === "string"){
    setOpen(true)
const err = insertFlight.split('ERROR:')[1].trim().split('Caused by:')[0].trim();


    setErrorMessage(err)
    throw new Error(insertFlight)
  }
}


  return (

    <Box  color="primary"  sx={{ minWidth: 120 }}>
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" color="red" component="h2">
             Error
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             {errorMessage}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <FormControl fullWidth>
        <InputLabel id="select-plane-id">Plane</InputLabel>
        <Select
          labelId="select-plane-label"
          id="select-plane"
          value={plane ? plane.name : ''}
          label="Plane"
          onChange={handleChange}
        >
         {allPlanes.map((plane:Plane,index:number)=> (
             <MenuItem key={index}  value={plane.name}>{plane.name}</MenuItem>
         ))}
         
        </Select>
        <TextField value={tickets} onChange={handleChangeInput} id="ticket" label="Flight Code" variant="filled" />
        <Button onClick={e => handleSubmit()} className='mt-3 bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]' variant="contained"   endIcon={<SendIcon />}>
        Send
      </Button>
      </FormControl>
    
    </Box>

 
   
  );
}