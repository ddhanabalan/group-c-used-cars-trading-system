import React from 'react'
import { CustomButton } from '@/app/components'

const Cosidebar = () => {
  return (
    <div className="flex flex-col items-center mx-6 mt-16 text-center bg-white rounded-3xl basis-1/4 h-3/4">
        <div className='flex flex-col items-center justify-center gap-2'>
      

      

      <div className="flex flex-col items-center font-bold justify-center text-lg gap-2 p-3 mx-5 my-4 border-2 border-[#f5f5f5] rounded-2xl ">
        <p className='text-center '>User Activity</p>
        </div>

       
        <div className="flex flex-col items-center text-xs justify-center gap-1 p-5 mx-5 border-2 border-[#f5f5f5] rounded-2xl ">
        <p>Anand k reported Sunil Mehta as SCAM/FRAUD</p>
        <p>- reported just now</p>   
      </div>

      <div className="flex flex-col items-center text-xs justify-center gap-1 p-5 mx-5 border-2 border-[#f5f5f5] rounded-2xl ">
        <p>Shifrad N reported Robin INAPPROPRIATE USER</p>
        <p>- reported 3 minutes ago</p>   
      </div>
      <div className="flex flex-col items-center text-xs justify-center gap-1 p-5 mx-5 border-2 border-[#f5f5f5] rounded-2xl ">
        <p>Sanoop reported Vinay S INAPPROPRIATE USER</p>
        <p>- reported 9 minutes ago</p>   
      </div>
      <div className="flex flex-col items-center text-xs justify-center gap-1 p-5 mx-5 border-2 border-[#f5f5f5] rounded-2xl ">
        <p>Ria John reported Godwin Jo SCAM/FRAUD</p>
        <p>- reported 13 minutes ago</p>   
      </div>
      
      </div>
      

      </div>


  )
}

export default Cosidebar