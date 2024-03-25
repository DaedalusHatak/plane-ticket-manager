"use client"

import { ButtonBlue } from "@/src/utils/muiStyled/button"
import { useRouter } from "next/navigation"

export default function NavBarUser(){
    const router = useRouter();
    return (
        <nav className="h-20 flex gap-5 bg-white w-full items-center justify-center px-12 ">
      <div className="flex justify-end w-full max-w-4xl">
      <ButtonBlue variant="contained" onClick={(e) => router.push("/")}>
          Home
        </ButtonBlue>
      </div>
     
      </nav>
    )
}