import { cookies } from "next/headers";

export async function POST(req: Request){
    const {passId,newExpiration} = await req.json();
  cookies().set('passid',passId,{expires:newExpiration})

}