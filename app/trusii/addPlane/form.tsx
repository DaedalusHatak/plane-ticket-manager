"use client"
import { FormEvent, useState } from 'react';
import { handleSubmit } from './serverActions';



export default function Form() {
const [numberOfSeats,setNumberOfSeats] = useState("");
const [flightNumber,setFlightNumber] = useState("");

function handleSubmition(e:FormEvent){
    e.preventDefault();
    const number = parseInt(numberOfSeats);
   if(!isNaN(number)){
    handleSubmit(flightNumber,number,6);
   }else{
    console.log("Not a Number")
   }
}

  return (
   <>
<form action="" onSubmit={(e)=>handleSubmition(e)}>
<div>
<label>Seats available:</label>
<input type="number" onChange={(e)=>setNumberOfSeats(e.target.value)} />

</div>
<div>
<label>Flight code:</label>
<input type="text" value={flightNumber}  onChange={(e)=>setFlightNumber(e.target.value.toUpperCase())} />

</div>
<button>Submit</button>
</form>
   </>

  )}
