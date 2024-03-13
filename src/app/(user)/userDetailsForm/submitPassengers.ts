"use server";
import { setBasket } from "./getBasket";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleSubmitForm = (e: FormData, forward: any) => {
  const id = uuidv4();
  const currDate = new Date();
  const newDate = new Date(currDate);
  newDate.setMinutes(currDate.getMinutes() + 15);
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
  setBasket(id, newDate, newData);
  redirect(`/flights/${forward}`);
};
