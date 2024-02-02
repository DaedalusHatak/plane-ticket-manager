import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LoginForm from "./loginForm";
import { cookies } from "next/headers";
import Image from "next/image";
import { Box } from "@mui/material";
import { login } from "./serverActions";
export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const handleSubmit = async (formData: FormData) => {
    try {
      console.log(formData)
      const info = await login(formData);
      console.log(info);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false)
    }
  };


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
