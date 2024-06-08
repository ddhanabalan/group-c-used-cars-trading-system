"use client"

import { useState } from "react";
import BuySellBar from "./components/BuySellBar";
import Buycard from "./components/Buycard";
import SideBar from "./components/SideBar";
import Sellcard from "./components/Sellcard";
import Wishlistcard from "./components/Wishlistcard";


export default function Home() {
  const [selection, set_selection] = useState(0)

  var widget = selection == 0? (<Buycard/>): 
    selection == 1? (<Sellcard/>): <Wishlistcard/>

  return (
    <main className="flex flex-row gap-2 h-screen bg-[#f5f5f5] ">
      <div className=" mt-24">
        <SideBar/>
      </div>
      
      <div className="mt-24 mr-8 mb-8 bg-white w-full rounded-3xl">
          <BuySellBar selection={selection} on_selection_changed={(index: number) => {
            set_selection(index)
          }}/>
         {widget}
      </div>
    </main>
  );
}
