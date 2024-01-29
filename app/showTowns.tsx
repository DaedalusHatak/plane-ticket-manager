"use client"
export default function ShowTowns({airports}:any){
    const test = airports.filter((airport:any) =>
    Object.values(airport).some((value) =>
      String(value).toLowerCase().includes("br")
    )
  );
    return (
        <>
        
        </>
    )
}