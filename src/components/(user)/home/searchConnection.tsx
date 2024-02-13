"use client";
import {  useState } from "react";

import { useRouter } from "next/navigation";
import ShowListDiv from "../../(global)/showListWrapper";
import { handleFlightForm } from "@/src/server-actions/handleFlightForm/handleFlightForm";

export default function FindConnection({ airports }: { airports: Airport[] }) {
  const [error, setError] = useState("");
  const router = useRouter();
  const [errorLabels, setErrorLabels] = useState<ErrorLabels>({
    origin: false,
    destination: false,
  });

  const handleParentSubmit = async (e: FormData) => {
    const data = await handleFlightForm(e, airports);
    console.log(data);
    if (data.isError.origin || data.isError.destination) {
      setError("Please select airport");
      setErrorLabels({ origin: true, destination: true });
    } else {
      router.push(
        `/flights/search?origin=${data.targetLink.origin}&destination=${data.targetLink.destination}`
      );
    }
  };

  return (
    <div className=" w-full max-w-5xl ">
      {error && <p className="text-center text-xl text-red-500">{error}</p>}
      <form className="flex" action={(e) => handleParentSubmit(e)}>
        <ShowListDiv
          showAll={true}
          errorLabels={errorLabels}
          setErrorLabels={setErrorLabels}
          airports={airports}
        ></ShowListDiv>
      </form>
    </div>
  );
}
