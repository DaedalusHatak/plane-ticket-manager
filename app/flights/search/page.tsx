import { handleFindingConnection } from "@/app/serverActions";
import { Typography } from "@mui/material";

function capitalizeText(text:string){
return text.charAt(0).toUpperCase() + text.slice(1)
}

export default async function Page({params,searchParams}: {params:{query:string}, searchParams?:any}){
    const origin = capitalizeText(searchParams.origin)
    const destination = capitalizeText(searchParams.destination)
    const con = await handleFindingConnection(origin, destination);
    const connections = con.rows
console.log(searchParams)
    return (
        
       <>
        {
            connections.map((connection: any) => (
                <div
                    className=" cursor-pointer relative mt-4 flex w-full justify-between items-center bg-gray-300 min-h-[62px] rounded-md"
                    key={connection.id}
                >
                    <Typography className="absolute left-4 text-xs md:text-base">
                        {connection.tickets_name}
                    </Typography>
                    <Typography className=" whitespace-pre flex-grow flex items-center justify-center text-xs md:text-base">
                        {' '}
                        {connection.origin}{' '}
                       
                        {' ' + connection.destination}
                    </Typography>
                    <Typography className="absolute right-4 text-xs md:text-base">
                        {connection.prices[4]}zł
                    </Typography>
                </div>
            ))}
       </>
    )
}