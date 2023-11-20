import Seat from "./seat";

export default function Grid({data}:any){
const chunkedArray:any = []
function splitData(){
for(let i=0;i<data.length;i+= 6){
    const chunk = data.slice(i, i + 6);
    chunkedArray.push(...chunk.slice(0, 3), Math.floor(i / 6) + 1, ...chunk.slice(3));

}
}
splitData()
   return(
    <div className="grid grid-cols-[repeat(7,minmax(0,min-content))] gap-3">
    {chunkedArray.map((element:any,index:number)=>(
        <div
        className={` flex justify-center items-center mx-auto text-center col-span-1 ${typeof element !== 'number' ? 'bg-[#166bc8] h-8 w-8' : ''} `}
        key={index}
      >
        {typeof element === 'number' ? <p>{element}</p> : <Seat seat={JSON.parse(JSON.stringify(element))}></Seat> }
      </div>
))}
    </div>
   )
}