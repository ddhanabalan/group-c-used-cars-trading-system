"use client"

import React, { useState } from 'react'
import Link from 'next/link'


const BuySellBar = ({selection, on_selection_changed = undefined}: {selection: number, on_selection_changed?: any|undefined}) => {
  return (
    <div className='flex flex-row items-center justify-start gap-2 mx-10 mt-10 mb-5'>
        {/* Buy button */}
        <button className={`
        w-32 h-10 rounded-xl active:bg-black active:text-white
        ${selection == 0? "hover:bg-gray-700 dark:hover:bg-[#404040]  bg-black text-white": "hover:bg-gray-200 dark:hover:bg-[#404040] dark:hover:text-white  dark:bg-[#181818] dark:text-[#f5f5f5] bg-white text-black"}
        `} onClick={() => {
            on_selection_changed(0)
        }}>Buy</button>

        {/* Sell button */}
        <button className={`
        w-32 h-10 rounded-xl active:bg-black active:text-white
        ${selection == 1? "hover:bg-gray-700 dark:hover:bg-[#404040] bg-black text-white": "hover:bg-gray-200 dark:hover:bg-[#404040] dark:hover:text-white dark:bg-[#181818] dark:text-[#f5f5f5] bg-white text-black"}
        `} onClick={() => {
            on_selection_changed(1)
        }}>Sell</button>

        {/* Wishlist button */}
        <button className={`
        w-32 h-10 rounded-xl active:bg-black active:text-white
        ${selection == 2? "hover:bg-gray-700 dark:hover:bg-[#404040] bg-black text-white": "hover:bg-gray-200 dark:hover:bg-[#404040] dark:hover:text-white dark:bg-[#181818] dark:text-[#f5f5f5] bg-white text-black"}
        `} onClick={() => {
            on_selection_changed(2)
        }}>Wishlist</button>

       
        
        
    </div>
   


  )
    
    
}

export default BuySellBar
