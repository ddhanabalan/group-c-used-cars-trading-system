"use client"

import { useState } from "react";
import BuySellBar from "./components/BuySellBar";
import Buycard from "./components/Buycard";
import SideBar from "./components/SideBar";
import Sellcard from "./components/Sellcard";
import Wishlistcard from "./components/Wishlistcard";
import HeaderBar from "../components/header_bar";


export default function Home() {
  const [selection, set_selection] = useState(0)

  var widget = selection == 0? (<Sellcard/>): <Wishlistcard/>

  return (
    <main className="flex flex-col min-h-screen bg-[#F5F5F5] dark:bg-[#181818] ">
      <HeaderBar/>
      <div className="flex flex-row gap-2 mx-10 h-screen">
        <div className=" mt-16 ">
          <SideBar/>
        </div>
        
        <div className="mt-16 mr-8 mb-8 bg-white dark:bg-[#282828] w-full rounded-3xl">
            <BuySellBar selection={selection} on_selection_changed={(index: number) => {
              set_selection(index)
            }}/>
          {widget}
        </div>


      </div>
    </main>
  );
}
