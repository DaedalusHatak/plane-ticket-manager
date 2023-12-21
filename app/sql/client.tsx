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
import { sql } from '@vercel/postgres';
import { handleInsertFlights } from './serverActions';
export default function BasicSelect({allPlanes}:{allPlanes: Plane[]}) {
  const [plane, setPlane] = useState<Plane | null>();
  const [tickets, setTickets] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    
    const selectedPlane = allPlanes.find((e) => e.name === event.target.value)
    setPlane(selectedPlane);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTickets(event.target.value);
  
  };




  return (
    <StyledEngineProvider injectFirst>
    <Box  color="primary"  sx={{ minWidth: 120 }}>
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
        <Button onClick={e => handleInsertFlights(plane!,tickets)} className='mt-3 bg-blue-500 hover:bg-blue-900 hover:shadow-[0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)]' variant="contained"   endIcon={<SendIcon />}>
        Send
      </Button>
      </FormControl>
    
    </Box>
  </StyledEngineProvider>
 
   
  );
}