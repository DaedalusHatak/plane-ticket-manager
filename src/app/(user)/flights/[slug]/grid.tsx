"use client";
import { useState } from "react";
import Seat from "./seat";
import { ButtonBlue } from "@/src/utils/muiStyled/button";
import { Box } from "@mui/material";
import { handleSelectingSeat } from "@/src/server-actions/sql/serverActions";
import { useRouter } from "next/navigation";
import Error from "next/error";
import { deleteFromBasket } from "../../userDetailsForm/updateBasket";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
export default function Grid({
  data,
  passengerList,
  passId,
  ticketId,
}: {
  data: Seat[];
  passengerList: PassengerData;
  passId:RequestCookie,
  ticketId:string;
}) {

  console.log(passengerList)
const [isGoingToExpire,setIsGoingToExpire] = useState(false)
  const expirationTime = new Date(passengerList.date)
  const currentTime = new Date().getTime()
const timeoutTime = expirationTime.getTime() - (1 * 60 * 1000);
const delay = timeoutTime - Date.now();

if(timeoutTime > currentTime){
  setTimeout(()=>{
    setIsGoingToExpire(true)
    },delay)
    setTimeout(async ()=>{
      await deleteFromBasket(passId.value, ticketId)
      router.push('/')
    },timeoutTime)
}



  const router = useRouter();

  const [chunkedArray, setChunkedArray] = useState<Seat[]>(data);
  const [index, setIndex] = useState(0);
    const [passList,setPassList] = useState(passengerList.passenger_list);

 
async function handleConfirmation() {
await passList.forEach((e)=>{
if(!e.seat){
  throw new Error({statusCode:404,title:"Something went wrong"})
}
})
const isSuccess = await handleSelectingSeat(ticketId,passList,passId.value)
if(isSuccess){
  router.push('/confirmation')
}
else console.log('something went wrong')
}

  async function updateSeat(element: Seat) {

    passList[index].seat = element.seat_number;
    if (index >= passList.length) return;
    const updatedElement = {
      ...element,
      is_taken: true,
      uuid:passId.value,
      name:
        passList[index].firstName +
        " " +
        passList[index].lastName,
    };

    const idx = chunkedArray.findIndex(
      (e: Seat) => element.seat_number === e.seat_number
    );
    setChunkedArray((prevArray: Seat[]) => {
      const newArray = [...prevArray];
      if (newArray[idx].is_taken === false) {
        newArray[idx] = updatedElement;
        newArray.forEach((e, i) => {
          if(i !== idx && e.uuid && passId.value ===  e.uuid){
            const updatedData = { ...e, is_taken: false };
            delete updatedData.name;
            delete updatedData.uuid;
            newArray[i] = updatedData;
          }
          else if (i !== idx && e.name && updatedElement.name  ===  e.name && (e.uuid && updatedElement.uuid === e.uuid)) {
          console.log("else if")
            const updatedData = { ...e, is_taken: false };
            delete updatedData.name;

            newArray[i] = updatedData;
          }
        });

        setIndex(index  >= passList.length - 1 ? index : index + 1);

      }

      return newArray;
    });
  }
  if(isGoingToExpire)
  return(<section>
    Your session is about to expire!
  </section>)
  else return (
    
    <section className=" text-black w-full">


                <Box  className=" bg-white  sm:w-[300px] shadow-md lg:absolute mb-10 rounded-lg p-4">
  <h3 className="text-xl font-semibold border-b pb-2 mb-4">Passenger List</h3>
  <ul className="list-none m-0 p-0">
{passList.map((passenger:PassengerDetails,idx:number) => (
   <li key={idx} onClick={e=>setIndex(idx)} className={`flex cursor-pointer items-center px-2 rounded-md  ${index === idx ? 'bg-slate-400' : 'bg-slate-200'} mb-2`}>
   <span className="flex-auto font-medium">{passenger.firstName + " " + passenger.lastName}</span>
   <span className="h-full  py-2 px-2">
    <p className="flex-none flex text-sm  text-white bg-blue-500 rounded-md font-bold border-2 border-blue-500 w-10 h-10 justify-center items-center">
   {passenger.seat ? passenger.seat : ''}</p></span>
   <span className={`flex-none ml-2 w-3 h-3 rounded-full ${index === idx ? 'bg-blue-500' : 'bg-transparent'}`}></span>

 </li>
))}
   
  <ButtonBlue onClick={e=>handleConfirmation()}>Confirm booking</ButtonBlue>
  </ul>
</Box>

      <div className="overflow-y-hidden w-full  flex justify-center">
        <div className=" grid grid-cols-[repeat(7,minmax(0,min-content))] gap-3 border-plane ">
          {chunkedArray.map((element: Seat, index: number) => (
            <div
              className={`relative flex justify-center items-center mx-auto text-center col-span-1 ${
                typeof element !== "number" &&
                element.seat_number !== "01D" &&
                element.seat_number !== "01E" &&
                element.seat_number !== "01F"
                  ? "bg-[#166bc8] h-8 w-8"
                  : ""
              } `}
              key={index}
            >
              {typeof element === "number" && <p>{element}</p>}
              {typeof element !== "number" &&
                element.seat_number !== "01D" &&
                element.seat_number !== "01E" &&
                element.seat_number !== "01F" && (
                  <Seat isPassenger={passengerList}  setNewSeat={updateSeat} seat={element}></Seat>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
