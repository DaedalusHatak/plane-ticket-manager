import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Form from "./form";
import { cookies } from "next/headers";
export default async function Page(){
    const supabase = createServerComponentClient({cookies})
    return (
        <main className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col gap-10 justify-center items-center bg-slate-400 rounded-xl p-6 w-full max-w-[540px] h-[640px]">
          <h1 className="text-4xl">Login</h1>
            <Form></Form>
          </div>
        </main>
    )
}