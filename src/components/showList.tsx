"use client"

import { useEffect, useState } from "react"

export default function ShowList({airports,onClick,filterCountries,setFilterCountries,allAirports}:{airports:Airport[],onClick:any,filterCountries:string,setFilterCountries:any,allAirports?:boolean}){
	const setOfCities = new Set(airports.map((city:Airport) => city.country))
	const arrOfCities = Array.from(setOfCities)
   

    const [arrOfAirports,setArrOfAirports] = useState<Airport[]>([])


useEffect(()=>{
    if(filterCountries){
        const results = airports.filter((airport:any) =>
            Object.values(airport).some(value =>
              String(value).toLowerCase().includes(filterCountries.toLowerCase())
            )
          );
setArrOfAirports(results);
    }
    else{
        
        setArrOfAirports([])
    }
  },[airports,filterCountries])
   
const setAll = (e:any) => {
	setFilterCountries("all-flights")
	onClick(e,"all-flights")
}
   return (
    <div  className='w-full  mt-4 grid grid-cols-[50%,50%] sm:grid-cols-[70%,30%] bg-red-600'>
	
	<ul className={`relative ${allAirports ? 'pt-12' : 'pt-1'} columns-1 sm:columns-2 md:columns-3 lg:columns-4 py-4 px-2 border-r-2 `}>
{allAirports && 	<div onClick={e=> setAll(e)}  tabIndex={0}  className={`px-2  absolute left-1/2 top-1 -translate-x-1/2 w-min cursor-pointer ${filterCountries === 'all-flights' ? 'bg-green-500 px-2' : ''} rounded-xl p-1`}>
		All
		</div>}
	{arrOfCities.map(airport => (
		<div  className='py-[6px]' key={airport}>
		<div onClick={e=> setFilterCountries(airport)}  tabIndex={0}  className={`px-2 w-min cursor-pointer ${filterCountries  && airport.toLowerCase().includes(filterCountries.toLowerCase()) || arrOfAirports.some(val => val.airportname.toLowerCase().includes(filterCountries.toLowerCase()) && val.country.toLowerCase() === airport.toLowerCase()) ? 'bg-green-500 px-2' : ''} rounded-xl p-1`}>
		{airport}
		</div>
		</div>
	))}
	</ul>
	<div className='flex flex-col gap-1 py-4 px-2'>
		{arrOfAirports.map(airport => (
			<div key={airport.airportcode} onClick={(e)=> onClick(e,airport.airportname)} tabIndex={0}   className={`px-2 index  w-min cursor-pointer ${filterCountries  && airport.airportname.toLowerCase().includes(filterCountries.toLowerCase()) ? 'bg-green-500 px-2' : ''} rounded-xl p-1`}>
			{airport.airportname}
			</div>
		))}
	</div>
</div>
   )
}