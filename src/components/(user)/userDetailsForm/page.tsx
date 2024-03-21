import { getBasket } from "./getBasket";
import UserDetailsForm from "./userDetailsForm";
import { cookies } from "next/headers";
export default async function Home() {
  const passId = cookies().get("passid");
  const fileJson = getBasket(passId);
  return <UserDetailsForm key={fileJson} />;
}
