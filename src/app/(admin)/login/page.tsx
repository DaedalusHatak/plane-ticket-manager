import LoginForm from "../../../components/(admin)/login/loginForm";
import Image from "next/image";
import { Box } from "@mui/material";
import { login } from "./serverActions";
export default async function Page() {



  return (
    <main className="bg-airport text-white flex items-center justify-center min-h-svh bg-gray-600 max-h-svh overflow-hidden">
      <div  className="flex flex-col  bg-gray-600 bg-opacity-90 justify-center items-center rounded-md p-6 w-full max-w-[500px] h-[540px]">
      <Box sx={{width:150}}>
   <Image src="/airlineLogo.png" width={500} height={500} alt="" />
    </Box>
        <h1 className="text-4xl">Login</h1>
        <form action={login} className="flex flex-col mt-10 gap-5 w-full px-5 sm:px-20">
          <LoginForm></LoginForm>
        </form>
      </div>
    </main>
  );
}
