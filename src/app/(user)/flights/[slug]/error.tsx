"use client"
type ErrorProps = {
    error: Error;
    reset: () => void;
  };
export default function Error({error,reset}:ErrorProps){
    return (
        {error}
    )
    }