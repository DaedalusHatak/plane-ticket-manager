"use client";
import UserDetails from "./userDetails";
import { ButtonBlue } from "@/src/utils/muiStyled/button";
import { StyledFilledInput } from "@/src/utils/muiStyled/textField";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { handleSubmitForm } from "./submitPassengers";

export default function UserDetailsForm({ forward, setForward }: any) {
  const t = new Date();
  const router = useRouter();
  const [passengerAmount, setPassengerAmount] = useState(0);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      const numbs = containerRef.current?.getBoundingClientRect();
      console.log(numbs);
      if (containerRef.current && numbs) {
        if (
          e.clientX < numbs.x ||
          e.clientY < numbs.y ||
          e.clientX > numbs.x + numbs.width ||
          e.clientY > numbs.y + numbs.height
        ) {
          console.log(e);
          setForward("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleAmountOfPassengers = (e: FormData) => {
    const passAmount = e.get("passenger-amount");
    if (passAmount) {
      const numberOfPassengers = parseInt(passAmount as string);
      if (numberOfPassengers <= 5) {
        setError("");
        setPassengerAmount(numberOfPassengers);
      } else setError("Max number of passengers: 5");
    }
  };

  return (
    <div className="w-full top-0 left-0 z-10  h-full fixed bg-[#000000dd] ">
      <div
        ref={containerRef}
        className="fixed z-20 rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full md:w-[30rem] bg-slate-300 px-8 py-24"
      >
        <h1 className="mb-5 text-center text-xl font-bold">
          {passengerAmount > 0
            ? " Enter passenger details"
            : "Specify the number of passengers"}
        </h1>
        {error && (
          <p className="text-center absolute top-10 left-1/2 -translate-x-1/2 text-red-500 font-semibold">
            {error}
          </p>
        )}
        {passengerAmount > 0 ? (
          <form
            className=" flex flex-col gap-7 items-center justify-center"
            action={(e) => handleSubmitForm(e, forward)}
          >
            <div>
              {Array.from({ length: passengerAmount }).map((arr, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  Passenger {idx + 1}
                  <UserDetails id={idx} key={idx} />
                </div>
              ))}
            </div>
            <ButtonBlue
              className="pt-12 max-w-2xl"
              variant="contained"
              fullWidth
              type="submit"
            >
              Continue
            </ButtonBlue>
          </form>
        ) : (
          <form
            className=" flex flex-col gap-5  items-center justify-center"
            action={handleAmountOfPassengers}
          >
            <StyledFilledInput
              name="passenger-amount"
              label="Number of passengers"
            />
            <ButtonBlue
              className="pt-12 max-w-2xl"
              variant="contained"
              fullWidth
              type="submit"
            >
              Continue
            </ButtonBlue>
          </form>
        )}
      </div>
    </div>
  );
}
