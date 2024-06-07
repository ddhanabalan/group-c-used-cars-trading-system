"use client";

import React from 'react'
import CustomSelectBox from "./components/CustomSelectBox";
import CustomEntryBox from './components/CustomEntryBox';



const page = () => {
    const handleOptionSelect = (option: any) => {
        console.log("Selected option:", option);
     };

     const handleInputChange = (value: string) => {
        console.log("Input value:", value);
     };
  return (
    <main className="grid grid-cols-3 h-screen gap-4 p-6 bg-[#F5F5F5] overflow-scroll">
      <div className='flex flex-col col-span-1 gap-4 mt-20'>

        {/* brand */}
         <div className="flex flex-col w-full col-span-1 px-6 py-4 mx-16 bg-white rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold'>Select your brand</h1>
            </div>
            <CustomSelectBox
                  options={["Tehran", "Shiraz", "Yazd", "Mashhad", "Esfahan"]}
                  placeholder="Brand"
                  onOptionSelect={handleOptionSelect}
               />
         </div>
         {/* year */}
         <div className="flex flex-col w-full col-span-2 px-6 py-4 mx-16 bg-white rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold'>Select year</h1>
            </div>
            <CustomSelectBox
                  options={["Tehran", "Shiraz", "Yazd", "Mashhad", "Esfahan"]}
                  placeholder="Year"
                  onOptionSelect={handleOptionSelect}
               />
         </div>
         {/* model */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold'>Select your Model</h1>
            </div>
            <CustomSelectBox
                  options={["Tehran", "Shiraz", "Yazd", "Mashhad", "Esfahan"]}
                  placeholder="Model"
                  onOptionSelect={handleOptionSelect}
               />
         </div>
         {/* vin */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold'>Type VIN number</h1>
            </div>
            <CustomEntryBox
                  placeholder="VIN"
                  onInputChange={handleInputChange}
               />
         </div>
      </div>
      <div className='flex flex-col col-span-1 gap-4 mt-20'>
         {/* fuel */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold'>Select fuel type</h1>
         </div>
         <CustomSelectBox
               options={["Gas","Hybrid","Electric","Other"]}
               placeholder="Fuel"
               onOptionSelect={handleOptionSelect}
            />
         </div>
         {/* transmission */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold'>Select Transmission</h1>
         </div>
         <CustomSelectBox
               options={["Manual", "Automatic", "Other"]}
               placeholder="Transmission"
               onOptionSelect={handleOptionSelect}
            />
         </div>
         {/* drive */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold'>Select your Drive</h1>
         </div>
         <CustomSelectBox
               options={["Forward", "All wheel", "4 Wheel", "Rear"]}
               placeholder="Brand"
               onOptionSelect={handleOptionSelect}
            />
         </div>
         {/* distance */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold'>Type Distance driven</h1>
         </div>
         <CustomEntryBox
               placeholder="Distance"
               onInputChange={handleInputChange}
            />
         </div>
      </div>
      <div className='flex flex-col col-span-2 gap-4'>
         {/* price */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold'>Type your Price</h1>
         </div>
         <CustomEntryBox
               placeholder="Price"
               onInputChange={handleInputChange}
            />
         </div>
      </div>
    </main>

  )
}

export default page
