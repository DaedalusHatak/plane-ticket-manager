"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { login } from './serverActions'
import { Button, CircularProgress, InputLabel, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { nextTick } from 'process'

export default  function Form(){
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        console.log(loading)
    },[loading])
    const handleSubmit = async (formData:FormData) => {
      
       try{
        setLoading(true)
        const info = await login(formData);
        console.log(info)
       }catch(e){
        console.log(e)
       }finally{
        // setLoading(false)
       }
    }

      return (
        <form className='flex flex-col gap-5'>

      <TextField id="email" name="email" type="email"  label="E-mail" variant="outlined" required/>
      <TextField id="password" name="password" type="password" label="Password"  variant="outlined" required/>
      <Button type='submit' formAction={handleSubmit} variant='contained'>{loading ? <CircularProgress /> : "Log in" }</Button>
    </form>
      )
}