"use client"

import { updateCookie } from "@/src/server-actions/sql/serverActions"
import { ButtonBlue } from "@/src/utils/muiStyled/button"
import { useRouter } from "next/navigation"




export default function WarningModal({passId,ticketId,setIsGoingToExpire}:any){

    const router = useRouter();

   async function handleSubmit(){
       await  updateCookie(passId,ticketId)
        setIsGoingToExpire(false)
     
    }

    return(<section className="absolute flex-[0_1_auto] min-h-svh w-full bg-black bg-opacity-75 flex flex-col justify-center items-center z-10 ">
      <p className="z-20 text-white text-2xl font-bold">  Your session is about to expire!</p>
      <form action={e=>handleSubmit()}>
      <ButtonBlue type="submit" variant="contained" color="secondary" className="!text-white">Confirm</ButtonBlue>
      </form>
      </section>)
}