"use client"

import { ButtonBlue } from "@/src/utils/muiStyled/button"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import Image from "next/image";
import { useRouter } from "next/navigation"

export default function Confirmation({passId}:{passId:RequestCookie}){
  const router = useRouter();

    if (passId)
    return (
        <>
       <div className="min-h-svh flex flex-col  w-full justify-center items-center px-4">

       <div className="flex flex-col justify-center items-center gap-5 bg-slate-300 border border-slate-400 px-6 rounded-lg w-full py-5 max-w-xl">
        <Image src='/airlineLogo.png' width={200} height={200} alt="Airline Logo"></Image>
     <h1 className="text-xl font-bold">You have booked successfully a flight!</h1>
     <p className="text-center">Your flight was successfully booked!<br/><b>All flights restarts</b> at the 1st day of month. <br/>Hopefully you enjoyed my app! Take care and fly safe! </p>
  
         <ButtonBlue variant="contained" onClick={e => router.push('/')}>Navigate to main page</ButtonBlue>
     </div>
       </div>
        </>
    )
}