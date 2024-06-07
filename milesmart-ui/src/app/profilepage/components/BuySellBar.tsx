import React from 'react'
import Link from 'next/link'


const BuySellBar = () => {
  return (
    <div className='flex flex-row items-center justify-start gap-2 mx-10 mt-10 mb-5'>
        <div className='content-center w-32 h-10 text-center border-2 border-gray-200 hover:text-white rounded-xl hover:bg-black selection:border-black'>
            <Link href=''>Buy</Link>
        </div>
        <div className='content-center w-32 h-10 text-center border-2 border-gray-200 rounded-xl hover:text-white hover:bg-black selection:border-black'>
            <Link href='/Sellcar'>Sell</Link>
        </div>
        <div className='content-center w-32 h-10 text-center border-2 border-gray-200 rounded-xl hover:text-white hover:bg-black selection:border-black'>
            <Link href='/Sellcar'>Wishlist</Link>
        </div>
        <div className='content-center w-32 h-10 text-center border-2 border-gray-200 rounded-xl hover:text-white hover:bg-black selection:border-black'>
            <Link href='/Sellcar'>Bids</Link>
        </div>

        
        
    </div>
   


  )
    
    
}

export default BuySellBar
