export default function Grid({data}:any){



   return(
    <div className="grid grid-cols-6 gap-7">
    {data.map((coli:any,index:number)=>(
        
<div
className="p-4 bg-lime-600"
key={coli._id}>
    {Math.floor(index / 6) + 1}
{coli.seatNumber}
</div>
))}
    </div>
   )
}