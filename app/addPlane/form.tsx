"use client"
import { FormEvent, useState } from 'react';
import { handleSubmit } from './serverActions';



export default function Form() {
const [numberOfSeats,setNumberOfSeats] = useState("");

function handleSubmition(e:FormEvent){
    e.preventDefault();
    const number = parseInt(numberOfSeats);
   if(!isNaN(number)){
    handleSubmit("tester",number,6);
   }else{
    console.log("Not a Number")
   }
}

  return (
   <>
<form action="" onSubmit={(e)=>handleSubmition(e)}>
<input type="text" onChange={(e)=>setNumberOfSeats(e.target.value)} />
<button>Submit</button>
</form>
   </>

  )}
