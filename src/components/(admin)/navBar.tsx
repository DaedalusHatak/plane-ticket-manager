"use client"

import { logout } from "@/src/app/(admin)/login/serverActions";
import { ButtonBlue } from "@/src/utils/muiStyled/textField";
import { useRouter } from "next/navigation";


export default function Navbar(){
    const router = useRouter();
    return(
        <nav className="h-20 flex gap-5 w-full items-center justify-end px-12 max-w-5xl">

    
             <ButtonBlue variant="contained" onClick={e => router.push('/')}>Home</ButtonBlue>
            <ButtonBlue variant="contained" onClick={e => logout()}>Logout</ButtonBlue>

           
        </nav>
    )
}