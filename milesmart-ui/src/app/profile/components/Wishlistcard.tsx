import React from 'react'
import { CustomButton } from '../../components'

const wishlistcard = () => {
  return (
    <div className='flex flex-col'>
      <div className='home__text-container'>
          <h1 className='ml-10 mb-2 text-2xl font-extrabold dark:text-white'>Your Wishlist</h1>
      </div>

      <div className='p-2 mx-10 my-2 border-2 dark:border-0 py-6 shadow-md dark:bg-[#181818ac] rounded-2xl h-fit' id='card1'>
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
            <button className='w-32 h-12  rounded-xl bg-black hover:bg-gray-800 dark:bg-[#303030] dark:hover:bg-white/10 text-white font-medium'>Remove</button>
            </div>

        </div>
        
        
      </div>

    
    </div>
  )
}

export default wishlistcard
