import { CustomButton } from '@/app/components'
import React from 'react'

const Buycard = () => {
  return (
    <div className='flex flex-col'>
      <div className='home__text-container'>
          <h1 className='ml-10 text-2xl font-extrabold mb-2 dark:text-white'>Your Orders</h1>
      </div>

      <div className='p-2 mx-10 my-2 border-2 dark:border-0 py-6 shadow-md dark:bg-black rounded-2xl h-fit' id='card1'>
        <div className='grid grid-cols-2'>
            <div className='self-center col-span-1 ml-10 home__text-container'>
                <h2 className='text-xl font-bold dark:text-white '>Maruti Suzuki LXI</h2>
                <div className='flex text-sm flex-row gap-3 dark:text-white'>
                    <p>2017</p>
                    <p>25,000 KMS</p>
                    <p>Petrol</p>
                    <p>Manual</p>
                    <p>2nd Owner</p>
                </div>
                
            </div>
            <div className='col-span-1 mr-10 justify-self-end content-center'>
            <button className='w-32 h-12  rounded-xl bg-black dark:bg-[#181818] dark:hover:bg-[#404040] text-white font-medium'>Continue</button>
            </div>
            
            
        </div>
        
      </div>

      

    </div>
  )
}

export default Buycard
