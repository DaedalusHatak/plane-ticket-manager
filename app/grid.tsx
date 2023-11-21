export default function Grid({data}:any){
const chunkedArray:any = []
function splitData(){
for(let i=0;i<data.length;i+= 6){
    const chunk = data.slice(i, i + 6);
    chunkedArray.push(...chunk.slice(0, 3), Math.floor(i / 6) + 1, ...chunk.slice(3));

}
console.log(chunkedArray)
}
splitData()
   return(
    <div className="grid grid-cols-7 gap-7">
    {chunkedArray.map((element:any,index:number)=>(
        <div
        className={`p-4 col-span-1 bg-lime-600 ${typeof element === 'number' ? 'mx-auto text-center' : ''}`}
        key={index}
      >
        {typeof element === 'number' && element}
        {element.seatNumber !== "01D" && element.seatNumber !== "01E" && element.seatNumber !== "01F" && typeof element !== 'number'  && element.seatNumber}
      </div>
))}
    </div>
   )
}