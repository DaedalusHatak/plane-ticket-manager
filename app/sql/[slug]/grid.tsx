"use client"
import { useEffect, useState } from "react";
import Seat from "./seat";

export default function Grid({ data }: {data:any}) {
  const [chunkedArray,setChunkedArray] = useState<Seat[]>(data)

 

 async function updateSeat(element:Seat){
    const updatedElement = {
        ...element,
      is_taken: true,
      name: "Paweł Sr"
    };
  
    const idx=chunkedArray.findIndex((e:Seat)=> element.seat_number === e.seat_number);
    setChunkedArray((prevArray:Seat[])=> {
        const newArray = [...prevArray];
        if(newArray[idx].is_taken === false){
          newArray[idx] = updatedElement;
          newArray.forEach((e,i) => {
            if (i !== idx && e.name && e.name === updatedElement.name){
                const updatedData = {...e, is_taken:false};
                delete updatedData.name;

                newArray[i] = updatedData
                
            }
        })
        }

       

        return newArray;
      });

 }
  return (
    <section className=" text-black w-full">
      <div className="overflow-y-hidden w-full  flex justify-center">
        <div className=" grid grid-cols-[repeat(7,minmax(0,min-content))] gap-3 border-plane ">
          {chunkedArray.map((element: any, index: number) => (
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
                  <Seat setNewSeat={updateSeat} seat={element}></Seat>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
