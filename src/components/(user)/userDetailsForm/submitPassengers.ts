"use server";

import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateBasket } from "./updateBasket";
import { EXPIRATION_TIME } from "@/src/globalValues";

export const handleSubmitForm = async (e: FormData, forward: string) => {
  const id = uuidv4();
  const currDate = new Date();
  const newDate = new Date(currDate);
  newDate.setMinutes(currDate.getMinutes() + EXPIRATION_TIME);
  cookies().set("passid", id, { expires: newDate });
  const values = e.entries();
  type Forms = ["first" | "last", "name", string];
  const newData = Array.from(values).reduce(
    (acc: any, [key, value], index: number) => {
      const [prefix, property, instanceIndex]: Forms = key.split("-") as Forms;
      if (property && instanceIndex) {
        if (!acc[instanceIndex]) {
          acc[instanceIndex] = {};
        }
        acc[instanceIndex][prefix === "first" ? "firstName" : "lastName"] =
          value;
      }

      return acc;
    },
    []
  );
  const tr = await updateBasket(newDate, id,newData,forward);

  redirect(`/flights/${forward}`);
};
