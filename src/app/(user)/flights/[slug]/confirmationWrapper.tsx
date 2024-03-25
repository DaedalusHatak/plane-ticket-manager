
import { deleteCookie } from "@/src/server-actions/sql/serverActions";

import { cookies } from "next/headers";
import Confirmation from "./confirmation";

export default async function ConfirmationWrapper(){
    const passId = cookies().get('passid');

    if (passId)
    return (
        <>
<Confirmation passId={passId}></Confirmation>
        </>
    )
}