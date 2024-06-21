"use client";

import React, { useEffect, useState } from 'react'
import CustomSelectBox from "./components/CustomSelectBox";
import CustomEntryBox from './components/CustomEntryBox';
import HeaderBar from '../components/header_bar';
import { CustomButton } from '../components';
import UploadForm from '../components/UploadForm';
import YearInput from './components/YearInput';
import DistanceInput from './components/DistanceInput';
import DescriptionInput from './components/DescriptionInput';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogClose } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';



const page = () => {
   const router = useRouter()
   const [state, set_state] = useState("")
   const [brand,set_brand] =useState("")
   const [cylinder,set_cylinder]=useState("")
   const [fuel,set_fuel]=useState("")
   const [transmission,set_transmission]=useState("")
   const [drive,set_drive]=useState("")
   const [condition,set_condition]=useState("")
   const [type,set_type]=useState("")
   const [status,set_status]=useState("")
   const [year, setYear] = useState<string>('')
   const [model,set_model]=useState("")
   const [vin,set_vin]=useState("")
   const [paint,set_paint]=useState("")
   const [description,set_description]=useState("")
   const [distance, setDistance] = useState<string>('');
   const [selected_files, set_selected_files] = useState<File[]>([]);
   const [token, set_token] = useState<string|undefined>()
   const [obj, setObj] = useState(Object())
   const [price,set_price] = useState("")
   const [prediction,set_prediction] = useState<number|undefined>()
   
    const handleOptionSelect = (option: any) => {
        console.log("Selected option:", option);
     };

     const handleInputChange = (value: string) => {
        console.log("Input value:", value);
     };

     const upload_vehicle = async () => {
      const img_urls = Array<string>()
      for (let index = 0; index < selected_files.length; index++) {
         const image = selected_files[index];

         const form_data = new FormData()
         form_data.append('path', image.name)
         form_data.append('file', image)
         
         //Uploading images
         const resp = await fetch(`http://localhost:5000/user/files`, {
            method: 'POST',
            headers: {
               'Authorization': `Bearer ${token}`,
               'Client': 'admin.client1',
               'Password': 'admin.client1.password'
            },
            body: form_data
         })
         
         if (resp.ok) {
            const file_obj = await resp.json()
            img_urls.push(`http://localhost:5000/files/${file_obj['_id']}`)
         } else {
            const txt = await resp.text()
            console.error(`Upload failed: ${txt}`)
         }
      }

      const resp = await fetch (`backend/user/vehicles`, {
         method: 'POST',
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            'model': model,
            'VIN': vin,
            'description': description,
            'price': Number(price),
            'year': Number(year),
            'manufacturer': brand,
            'condition': condition,
            'cylinders': cylinder,
            'fuel': fuel,
            'odometer': Number(distance),
            'title_status': status,
            'transmission': transmission,
            'drive': drive,
            'paint_color': paint,
            'state': state.toLowerCase(), 
            'image_urls': img_urls,
            'type' : type
         })
      })

      if (resp.ok) {
         const vehicle = await resp.json()
         console.log(vehicle)
         router.push(`product?vid=${vehicle['_id']}`)
      } else console.error(await resp.text())
  }

     useEffect(() => {
      const access_token = localStorage.getItem("token")
      if (access_token) set_token(access_token)
     })
  return (
    <main className="flex flex-col min-h-screen bg-[#F5F5F5] dark:bg-[#181818]">
      <HeaderBar className='z-20'/>
      <div className='grid grid-cols-3 gap-4 p-6  '>
         <div className='col-span-3 font-extrabold text-4xl dark:text-white ml-20'>Sell your Car</div>
         <div className='flex flex-col col-span-1 gap-4'>

         {/* brand */}
         <div className="flex flex-col w-full col-span-1 px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold dark:text-white'>Brand</h1>
            </div>
            <CustomSelectBox
                  options={['Acura','Alfa-Romeo','Aston Martin','Audi','Bmw','Buick','Cadillac','Chevrolet','Chrysler','Datsun','Dodge','Ferrari','Fiat','Ford','Gmc','Harley-Davidson','Honda','Hyundai','Infiniti','Jaguar','Jeep','Kia','Land Rover','Lexus','Lincoln','Mazda','Mercedes-Benz','Mercury','Mini','Mitsubishi','Morgan','Nissan','Pontiac','Porsche','Ram','Rover','Saturn','Subaru','Tesla','Toyota','Volkswagen','Volvo']}
                  placeholder="Brand"
                  onOptionSelect={(option: any) => {
                     set_brand(option)
                  }}
               />
         </div>
         {/* year */}
         <div className="flex flex-col w-full col-span-2 px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold dark:text-white'>Year</h1>
            </div>
            <YearInput minYear={1900} maxYear={2100} placeholder="Year" year={year} onChange={(e) => {
               setYear(e.target.value)
            }} />
         </div>
         {/* model */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold dark:text-white'>Model</h1>
            </div>
            <CustomEntryBox
               placeholder="Model"
               onInputChange={(option: any) => {
                  set_model(option)
               }}
            />
         </div>
         {/* vin */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
            <div className='mb-3 home__text-container dark:text-white'>
               <h1 className='text-2xl font-extrabold'>VIN</h1>
            </div>
            <CustomEntryBox
                    placeholder="VIN"
                    onInputChange={(option: any) => {
                     set_vin(option)
                  }}               />
         </div>
         {/* State */}
         <div className="flex flex-col w-full col-span-1 px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold dark:text-white'>State</h1>
            </div>
            <CustomSelectBox
                  options={[
                     'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ]}
                  placeholder="State"
                  onOptionSelect={(option: any) => {
                     set_state(option)
                  }}
               />
         </div>
         {/* cylinder */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold dark:text-white'>Cylinder</h1>
         </div>
         <CustomSelectBox
               options={["3 Cylinders","4 Cylinders","5 Cylinders","6 Cylinders","8 Cylinders","10 Cylinders","12 Cylinders","Other"]}
               placeholder="Cylinder"
               onOptionSelect={(option: any) => {
                  set_cylinder(option)
               }}
            />
         </div>
         {/* Paint */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
            <div className='mb-3 home__text-container dark:text-white'>
               <h1 className='text-2xl font-extrabold'>Paint</h1>
            </div>
            <CustomEntryBox
                    placeholder="Paint"
                    onInputChange={(option: any) => {
                     set_paint(option)
                  }}               />
         </div>
         
         </div>
         <div className='flex flex-col col-span-1 gap-4 '>
         {/* fuel */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold dark:text-white'>Fuel Type</h1>
         </div>
         <CustomSelectBox
               options={["Gas","Hybrid","Electric","Other"]}
               placeholder="Fuel"
               onOptionSelect={(option: any) => {
                  set_fuel(option)
               }}
            />
         </div>
         {/* transmission */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold dark:text-white'>Transmission</h1>
         </div>
         <CustomSelectBox
               options={["Manual", "Automatic", "Other"]}
               placeholder="Transmission"
               onOptionSelect={(option: any) => {
                  set_transmission(option)
               }}
            />
         </div>
         {/* drive */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold dark:text-white'>Drive</h1>
         </div>
         <CustomSelectBox
               options={["FWD", "4WD", "RWD"]}
               placeholder="Drive"
               onOptionSelect={(option: any) => {
                  set_drive(option)
               }}
            />
         </div>
         {/* distance */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold dark:text-white'>Distance</h1>
         </div>
         <DistanceInput minDistance={0} maxDistance={3000000} placeholder="Distance" distance={distance} onChange={(e) => setDistance(e.target.value)}  />
      
         </div>
         {/* conditon */}
         <div className="flex flex-col w-full col-span-1 px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
            <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold dark:text-white'>Condition</h1>
            </div>
            <CustomSelectBox
                  options={[
                     "Excellent", "Very Good", "Good", "Fair", "Average", "Poor", "Needs Repair", "Salvage", "Junk", "Rebuilt"  ]}
                  placeholder="Condition"
                  onOptionSelect={(option: any) => {
                     set_condition(option)
                  }}
               />
         </div>
         {/* type */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold dark:text-white'>Type</h1>
         </div>
         <CustomSelectBox
               options={["Pickup","Truck","Coupe","SUV","Hatchback","Mini-van","Sedan","Offroad","Bus","Van","Converitble","Wagon","Other"]}
               placeholder="Type"
               onOptionSelect={(option: any) => {
                  set_type(option)
               }}
            />
         </div>
         {/* Status */}
         <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
         <div className='mb-3 home__text-container'>
            <h1 className='text-2xl font-extrabold dark:text-white'>Status</h1>
         </div>
         <CustomSelectBox
               options={["Clean","Rebuilt","Lien","Salvage","Missing","Parts Only"]}
               placeholder="Status"
               onOptionSelect={(option: any) => {
                  set_status(option)
               }}
            />
         </div>
         </div>
         <div className='col-span-1'>
            <UploadForm onFileSelected={(files) => set_selected_files(files)}/>
         </div>
         {/* desc */}
         <div className='flex flex-col col-span-2 gap-4'>
               <div className="flex flex-col w-full px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl"> {/* Added z-10 */}
                  <div className='mb-3 home__text-container dark:text-white'>
                     <h1 className='text-2xl font-extrabold'>Description</h1>
                  </div>
                  <DescriptionInput
                     placeholder="Description"
                     onInputChange={(option: any) => {
                     set_description(option)
                     }}
                     defaultValue=''
                     className='w-full justify-start z-0'
                  />
               </div>
               </div>

               <div className='flex flex-col col-span-3 gap-4'>
               <div className="flex flex-1 place-self-end z-20">
                  <Dialog>
                     <DialogTrigger asChild>
                     <button className="
                        duration-150 text-white rounded-lg bg-black dark:bg-[#404040] dark:hover:bg-white/25 w-24 h-12 mx-16 min-w-[130px]" onClick={() => {
                           fetch (`backend/ml/price`, {
                              method: 'POST',
                              headers: {
                                 'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                 'model': model,
                                 'VIN': vin,
                                 'price': Number(price),
                                 'year': Number(year),
                                 'manufacturer': brand,
                                 'condition': condition,
                                 'cylinders': cylinder,
                                 'fuel': fuel,
                                 'odometer': Number(distance),
                                 'title_status': status,
                                 'transmission': transmission,
                                 'drive': drive,
                                 'paint_color': paint,
                                 'state': state.toLowerCase(), 
                                 'type' : type
                              })
                           }).then((resp) => resp.json()).then((js) => {
                              if ('error' in js) console.log(js)
                              else set_prediction(js['price'])
                           })
                        }}>Continue</button>
                     </DialogTrigger>
                     <DialogPortal>
                     <DialogOverlay className="bg-black/30 dark:bg-black/50 fixed inset-0 z-20" />
                     <DialogContent className="
                        fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                        max-h-[85vh] w-[90vw] max-w-[450px] rounded-lg shadow-lg outline-none overflow-clip
                        bg-white dark:bg-[#1b1b1b] dark:text-white z-40"
                     >
                        <div className="flex h-full">
                           <div className="bg-black dark:bg-[#282828] w-20 h-auto"></div>
                           <div className="flex flex-col flex-1 h-min px-4 pb-4">
                           <div className="text-xl font-semibold w-auto text-center p-2 mt-3">Set your Price</div>
                           <div className=" text-gray-600 dark:text-white text-base ml-1 mt-4 mb-1">Your Price</div>
                           <input className="bg-gray-100 dark:bg-[#282828] placeholder:text-gray-400 rounded px-2 py-1 outline-none" placeholder={obj['price']} 
                              onChange={(e) => {
                                 set_price(e.target.value)
                              }} />
                           <div hidden={prediction == undefined} className="text-sm text-green-600 bg-green-100 dark:text-green-200 dark:bg-green-800 w-min text-nowrap py-1 px-4 mt-2 self-end rounded-full ">AI Suggested Fair Price $ {Math.round(prediction ?? 0)*10}</div>
                           <DialogClose asChild>
                              <button className="
                                 px-4 py-1.5 mt-8 duration-150 rounded-md h-min w-full
                                 text-white 
                                 bg-black dark:bg-[#282828]
                                 hover:bg-gray-800 dark:hover:bg-white/25
                                 active:bg-gray-700 dark:active:bg-white/30" onClick={() => upload_vehicle()}>Continue</button>
                           </DialogClose>
                           </div>
                        </div>
                        <DialogClose asChild>
                           <button
                           className="text-black hover:bg-gray-200 active:bg-gray-300 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-600 rounded-full px-1.5 py-1.5 focus:outline-none absolute top-3 right-3"
                           aria-label="Close"
                           >
                           <Cross2Icon/>
                           </button>
                        </DialogClose>
                     </DialogContent>
                     </DialogPortal>
                  </Dialog>
               </div>
               </div>

      </div>

    </main>

  )
}

export default page
