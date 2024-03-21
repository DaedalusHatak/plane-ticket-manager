
import { deleteCookie } from "@/src/server-actions/sql/serverActions";

import { cookies } from "next/headers";

export default async function Confirmation(){
    const passId = cookies().get('passid');

    if (passId)
    return (
        <>
        <h1>You have booked successfully a flight!</h1>
        {/* <ButtonBlue>Navigate to main page</ButtonBlue> */}
        </>
    )
}