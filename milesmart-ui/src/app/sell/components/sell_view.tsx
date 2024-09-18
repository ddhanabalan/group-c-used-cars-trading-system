'use client'

// import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogClose } from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";
import CustomEntryBox from "./CustomEntryBox";
import CustomSelectBox from "./CustomSelectBox";
import DescriptionInput from "./DescriptionInput";
import DistanceInput from "./DistanceInput";
import YearInput from "./YearInput";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ComponentAttributes } from "@/components/atrributes";
import { ImageGallary } from "@/components/client/image_gallary";
import CustomSelectWithAdd from "./CustomSelectWithAdd";
import { PriceDialog } from "./price_dialog";
import { LoadDialog } from "./load_dialog";
import { backendFetch } from "@/app/actions";


export function SellView({}:ComponentAttributes) {
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
    // const [token, set_token] = useState<string|undefined>()
    // const [obj, setObj] = useState(Object())
    // const [price,set_price] = useState("")
    const [ContinueDialog,setContinueDialog] = useState(false)
    const [Loading,setLoading] = useState(false)
    const [prediction,set_prediction] = useState<number|undefined>()
    
     const handleOptionSelect = (option: any) => {
         console.log("Selected option:", option);
      };
 
      const handleInputChange = (value: string) => {
         console.log("Input value:", value);
      };
 
      const upload_vehicle = async (price: number) => {
       const img_urls = Array<string>()
       for (let index = 0; index < selected_files.length; index++) {
          const image = selected_files[index];
 
          const form_data = new FormData()
          form_data.append('path', image.name)
          form_data.append('file', image)
          
          //Uploading images
          const resp = await backendFetch(`http://localhost:5000/user/files`, {
             method: 'POST',
             body: form_data
          })
          
          if (resp.ok) {
             const file_obj = resp.data
             img_urls.push(`http://localhost:5000/files/${file_obj['_id']}`)
          } else {
             console.error(`Upload failed`)
          }
       }
 
       const resp = await backendFetch (`/user/vehicles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             'model': model,
             'VIN': vin,
             'description': description,
             'price': price,
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
             'state': state.split(' - ')[0].toLowerCase(), 
             'image_urls': img_urls,
             'type' : type
          })
       })
 
       if (resp.ok) {
          const vehicle = resp.data
          console.log(vehicle)
          router.push(`/product/${vehicle['_id']}`)
       } else console.error("Error occured on posting vehicle")
   }
 
      // useEffect(() => {
      //  const access_token = localStorage.getItem("token")
      //  if (access_token) set_token(access_token)
      // })
      
      //Checks if form is complete
      const isFormComplete = useMemo(
        () => state && brand && cylinder && fuel && transmission && drive && condition && type && status && year && model && vin && paint && description && distance && selected_files.length > 0,
        [state, brand, cylinder, fuel, transmission, drive, condition, type, status, year, model, vin, paint, description, distance, selected_files]
      );
      
    return (
        <div>
            {/* Page title */}
    <div className="font-extrabold text-2xl px-4 md:px-10 py-4 dark:text-white text-center md:text-left">
      Sell your Car
    </div>
    
  
    <div className="flex flex-col md:flex-row gap-4 px-4 md:px-10">
      {/* Upload Form */}
      <div className=" md:w-3/5">
        <ImageGallary type="localFiles" fileChoosingEnabled src={selected_files} onFileDelete={(index) => {
          selected_files.splice(index, 1);
          set_selected_files([...selected_files]);
        }} onFilesAdded={(files) => set_selected_files([...selected_files, ...files])}/>
      </div>
      {/* Form */}
      <div className='flex flex-col md:w-2/5 gap-4'>
          {/* Main Form Section */}
      <div className="grid grid-cols xl:grid-rows py-2 pb-6 gap-2 bg-white dark:bg-[#282828] rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 ">
          {/* Brand */}
          <div className="flex flex-col w-full px-4 md:px-6 py-2 ">
            <h1 className="text-xl font-extrabold dark:text-white py-2">Brand</h1>
            <CustomSelectWithAdd
              options={['Acura','Alfa-Romeo','Aston Martin','Audi','Bmw','Buick','Cadillac','Chevrolet','Chrysler','Datsun','Dodge','Ferrari','Fiat','Ford','Gmc','Harley-Davidson','Honda','Hyundai','Infiniti','Jaguar','Jeep','Kia','Land Rover','Lexus','Lincoln','Mazda','Mercedes-Benz','Mini','Mitsubishi','Morgan','Nissan','Pontiac','Porsche','Ram','Rover','Subaru','Tesla','Toyota','Volkswagen','Volvo']}
              placeholder="Brand"
              onOptionSelect={(option: any) => set_brand(option)}
            />
          </div>
  
          {/* Model */}
          <div className="flex flex-col w-full px-4 md:px-6 py-2">
            <h1 className="text-xl font-extrabold dark:text-white py-2">Model</h1>
            <CustomEntryBox
              placeholder="Model"
              onInputChange={(option: any) => set_model(option)}
            />
          </div>
  
          {/* Year */}
          <div className="flex flex-col w-full px-4 md:px-6 py-2">
            <h1 className="text-xl font-extrabold dark:text-white py-2">Year</h1>
            <YearInput minYear={1900} placeholder="Year" year={year} onChange={(e) => setYear(e.target.value)} />
          </div>
  
          {/* Fuel */}
          <div className="flex flex-col w-full px-4 md:px-6 py-2">
            <h1 className="text-xl font-extrabold dark:text-white py-2">Fuel Type</h1>
            <CustomSelectBox
              options={["Gas","Hybrid","Electric","Other"]}
              placeholder="Fuel"
              onOptionSelect={(option: any) => set_fuel(option)}
            />
          </div>
        </div>
      </div>
  
      {/* Additional Options */}
      <div className="grid grid-cols xl:grid-rows py-2 pb-6 gap-2 bg-white dark:bg-[#282828] rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 ">
        {/* VIN */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">VIN</h1>
          <CustomEntryBox
            placeholder="VIN"
            onInputChange={(option: any) => set_vin(option)}
          />
        </div>
        
        {/* State */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">State</h1>
          {/* <CustomSelectBox
            options={['HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']}
            placeholder="State"
            onOptionSelect={(option: any) => set_state(option)}
          /> */}
          <CustomSelectBox
            options={[
              'AL - Alabama', 'AK - Alaska', 'AZ - Arizona', 'AR - Arkansas', 'CA - California', 'CO - Colorado', 'CT - Connecticut', 'DE - Delaware', 'FL - Florida', 'GA - Georgia', 'HI - Hawaii', 'ID - Idaho', 'IL - Illinois', 'IN - Indiana', 'IA - Iowa', 'KS - Kansas', 'KY - Kentucky', 'LA - Louisiana', 'ME - Maine', 'MD - Maryland', 'MA - Massachusetts', 'MI - Michigan', 'MN - Minnesota', 'MS - Mississippi', 'MO - Missouri', 'MT - Montana', 'NE - Nebraska', 'NV - Nevada', 'NH - New Hampshire', 'NJ - New Jersey', 'NM - New Mexico', 'NY - New York', 'NC - North Carolina', 'ND - North Dakota', 'OH - Ohio', 'OK - Oklahoma', 'OR - Oregon', 'PA - Pennsylvania', 'RI - Rhode Island', 'SC - South Carolina', 'SD - South Dakota', 'TN - Tennessee', 'TX - Texas', 'UT - Utah', 'VT - Vermont', 'VA - Virginia', 'WA - Washington', 'WV - West Virginia', 'WI - Wisconsin', 'WY - Wyoming'
            ]}
            placeholder="State"
            onOptionSelect={(option: any) => set_state(option)}
          />
        </div>
  
        {/* Cylinder */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Cylinder</h1>
          <CustomSelectBox
            options={["3 Cylinders","4 Cylinders","5 Cylinders","6 Cylinders","8 Cylinders","10 Cylinders","12 Cylinders","Other"]}
            placeholder="Cylinder"
            onOptionSelect={(option: any) => set_cylinder(option)}
          />
        </div>
  
        {/* Paint */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Paint</h1>
          <CustomEntryBox
            placeholder="Paint"
            onInputChange={(option: any) => set_paint(option)}
          />
        </div>
  
        {/* Transmission */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Transmission</h1>
          <CustomSelectBox
            options={["Manual", "Automatic", "Other"]}
            placeholder="Transmission"
            onOptionSelect={(option: any) => set_transmission(option)}
          />
        </div>
  
        {/* Drive */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Drive</h1>
          <CustomSelectBox
            options={["FWD", "4WD", "RWD"]}
            placeholder="Drive"
            onOptionSelect={(option: any) => set_drive(option)}
          />
        </div>
  
        {/* Distance */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Distance</h1>
          <DistanceInput minDistance={0} maxDistance={3000000} placeholder="Distance" distance={distance} onChange={(e) => setDistance(e.target.value)} />
        </div>
  
        {/* Condition */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Condition</h1>
          <CustomSelectBox
            options={["Excellent", "Very Good", "Good", "Fair", "Average", "Poor", "Needs Repair", "Salvage", "Junk", "Rebuilt"]}
            placeholder="Condition"
            onOptionSelect={(option: any) => set_condition(option)}
          />
        </div>
  
        {/* Type */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Type</h1>
          <CustomSelectBox
            options={["Pickup","Truck","Coupe","SUV","Hatchback","Mini-van","Sedan","Offroad","Bus","Van","Convertible","Wagon","Other"]}
            placeholder="Type"
            onOptionSelect={(option: any) => set_type(option)}
          />
        </div>
  
        {/* Status */}
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Status</h1>
          <CustomSelectBox
            options={["Clean","Rebuilt","Lien","Salvage","Missing","Parts Only"]}
            placeholder="Status"
            onOptionSelect={(option: any) => set_status(option)}
          />
        </div>
        </div>
      </div>
  
      {/* Description */}
      <div className="flex flex-col col-span-1 md:col-span-2 py-2 pb-6 bg-white dark:bg-[#282828] rounded-lg">
        <div className="flex flex-col w-full px-4 md:px-6 py-2">
          <h1 className="text-xl font-extrabold dark:text-white py-2">Description</h1>
          <DescriptionInput
            placeholder="Description"
            onInputChange={(option: any) => set_description(option)}
            defaultValue=""
            className="w-full justify-start"
          />
        </div>
      </div>


  

      {/* Submit Button */}
      <div className='flex flex-col col-span-1 md:col-span-3 mb-2 gap-4'>
        <div className="flex flex-1 place-self-end">
          {/* <Dialog> */}
            {/* <DialogTrigger asChild> */}
              <button className={`
                  duration-150 text-white rounded-lg bg-black dark:bg-[#404040] dark:hover:bg-white/25 w-24 h-12 min-w-[130px]
                  ${!isFormComplete ? ' opacity-50' : ''}
                `}
                disabled={!isFormComplete}
                onClick={() => {
                  setContinueDialog(true)
                  // backendFetch('/ml/price', {
                  //   method: 'POST',
                  //   headers: {
                  //     'Content-Type': 'application/json',
                  //   },
                  //   body: JSON.stringify({
                  //     'model': model,
                  //     'VIN': vin,
                  //     'year': Number(year),
                  //     'manufacturer': brand,
                  //     'condition': condition,
                  //     'cylinders': cylinder,
                  //     'fuel': fuel,
                  //     'odometer': Number(distance),
                  //     'title_status': status,
                  //     'transmission': transmission,
                  //     'drive': drive,
                  //     'paint_color': paint,
                  //     'state': state.toLowerCase(),
                  //     'type': type
                  //   })
                  // }).then((resp) => {
                  //   if (!resp.ok) console.log("ERROR")
                  //   else set_prediction(resp.data)
                  // })
                }}>
                Continue
              </button>
            {/* </DialogTrigger> */}
            {/* <DialogPortal>
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
                    <div className="text-gray-600 dark:text-white text-base ml-1 mt-4 mb-1">Your Price</div>
                    <input className="bg-gray-100 dark:bg-[#282828] placeholder:text-gray-400 rounded px-2 py-1 outline-none" placeholder={obj['price']} 
                      onChange={(e) => set_price(e.target.value)} 
                    />
                    <div hidden={prediction == undefined} className="text-sm text-green-600 bg-green-100 dark:text-green-200 dark:bg-green-800 w-min text-nowrap py-1 px-4 mt-2 self-end rounded-full">
                      AI Suggested Fair Price $ {prediction}
                    </div>
                    <DialogClose asChild>
                      <button className="
                        px-4 py-1.5 mt-8 duration-150 rounded-md h-min w-full
                        text-white 
                        bg-black dark:bg-[#282828]
                        hover:bg-gray-800 dark:hover:bg-white/25
                        active:bg-gray-700 dark:active:bg-white/30" 
                        onClick={() => upload_vehicle()}>
                        Continue
                      </button>
                    </DialogClose>
                  </div>
                </div>
                <DialogClose asChild>
                  <button
                    className="text-black hover:bg-gray-200 active:bg-gray-300 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-600 rounded-full px-1.5 py-1.5 focus:outline-none absolute top-3 right-3"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </button>
                </DialogClose>
              </DialogContent>
            </DialogPortal> */}
          {/* </Dialog> */}
        </div>
      </div>
      </div>
      
    </div>
    <PriceDialog hidden={!ContinueDialog} onCancelled={() => setContinueDialog(false)} onContinue={(price) => {
      setLoading(true);
      upload_vehicle(price).then(() => setLoading(false))
    }}/>
    <LoadDialog hidden={!Loading}  />
    {/* <div>Hello</div> */}
  </div> )
}