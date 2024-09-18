import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import Popularcar from "./components/Popularcar";
import Premiumcar from "./components/Premiumcar";
import Image from "next/image"
import { HeaderBar } from "@/components/server/header_bar";


export default function Home() {
  return (
    <main className='flex flex-col min-h-screen dark:bg-[#181818] dark:text-white'>
      <HeaderBar/>
      <div className="flex flex-1 flex-col overflow-hidden  ">
        <div className="">
          <Hero />
        </div>

        <div className='mt-12 padding-x padding-y max-width bg-[#F5F5F5] rounded-xl dark:bg-[#121212]' id='feature'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold dark:text-white mt-5'>How Milesmart Works</h1>
            <p className=" dark:text-[#F5F5F5]">You’ll love the way you buy the car more than your car ! </p>
          </div>
          <Hero2 />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 px-5 py-10 max-w-screen-lg mx-auto" id="sellyourcar">
      <div className="my-16 lg:ml-10 text-center lg:text-left">
        <div className="text-4xl font-extrabold mt-12 dark:text-white">Sell your Car</div>
        <p className="text-xl font-medium dark:text-[#F5F5F5] mt-4">Boost your visibility with Milesmart</p>
        <p className="dark:text-[#F5F5F5] mt-4">
          MileSmart offers the finest automated audience selection, guaranteeing genuine and engaged buyers from your local and nearby areas. Sign up now to sell your cars online.
        </p>
      </div>
      <div className="relative w-full h-64 lg:h-auto lg:mt-12">
      <Image 
        src="/sellyourcar.png" 
        alt="Sell your car" 
        fill 
        style={{ objectFit: 'contain' }} 
        className="object-contain" 
      />
      </div>

    </div>

        <div className='mt-12 padding-x padding-y w-full' id='popularcars'>
          <div className='flex items-center justify-center '>
            <h1 className='text-5xl font-extrabold text-center '>Popular Brands. You might like.</h1>
          </div >
          <div className="pl-12"><Popularcar /></div>
          
        </div>

        <div className='mt-12 padding-x padding-y full' id='popularcars'>
          <div className='flex items-center justify-center '>
            <h1 className='text-5xl font-extrabold text-center '>Begin Your Search for Premium Cars</h1>
          </div>
          <div className="pl-12"><Premiumcar /></div>
        </div>
      </div>
      
    </main>
  );
}
