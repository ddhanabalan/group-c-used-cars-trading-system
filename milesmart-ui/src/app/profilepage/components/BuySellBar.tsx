"use client"

import React, { useState } from 'react'
import Link from 'next/link'


const BuySellBar = ({selection, on_selection_changed = undefined}: {selection: number, on_selection_changed?: any|undefined}) => {
  return (
    <div className='flex flex-row items-center justify-start gap-2 mx-10 mt-10 mb-5'>
        {/* Buy button */}
        <button className={`
        w-32 h-10 border-2 rounded-xl active:bg-black active:text-white
        ${selection == 0? "hover:bg-gray-700 bg-black text-white": "hover:bg-gray-200 bg-white text-black"}
        `} onClick={() => {
            on_selection_changed(0)
        }}>Buy</button>

        {/* Sell button */}
        <button className={`
        w-32 h-10 border-2 rounded-xl active:bg-black active:text-white
        ${selection == 1? "hover:bg-gray-700 bg-black text-white": "hover:bg-gray-200 bg-white text-black"}
        `} onClick={() => {
            on_selection_changed(1)
        }}>Sell</button>

        {/* Wishlist button */}
        <button className={`
        w-32 h-10 border-2 rounded-xl active:bg-black active:text-white
        ${selection == 2? "hover:bg-gray-700 bg-black text-white": "hover:bg-gray-200 bg-white text-black"}
        `} onClick={() => {
            on_selection_changed(2)
        }}>Wishlist</button>

        {/* Bids */}
        <button className={`
        w-32 h-10 border-2 rounded-xl active:bg-black active:text-white
        ${selection == 4? "hover:bg-gray-700 bg-black text-white": "hover:bg-gray-200 bg-white text-black"}
        `} onClick={() => {
            on_selection_changed(4)
        }}>Bids</button>
        
        
    </div>
   


  )
    
    
}

export default BuySellBar
