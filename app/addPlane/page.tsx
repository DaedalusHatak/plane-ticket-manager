import Image from 'next/image'
import {MongoClient} from "mongodb"
import mongoose from "mongoose";
import Form from './form';

async function addCollection(seats:number){

console.log(`Number of seats: ${seats}`)
    

  
}

export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center  px-6">
   <p>add a plane</p>
   <Form></Form>
    </main>
  )}
