"use client"

import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import Popularcar from "./components/Popularcar";
import Premiumcar from "./components/Premiumcar";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image"
import HeaderBar from "./components/header_bar";


export default function Home() {
  const [token, set_token] = useState<string|null>()
  const [search, set_search] = useState("");
  const search_params = useSearchParams()
  const router = useRouter()
  const [img_src, set_img_src] = useState("")

  const load_img = (token_string: string) => {
    fetch("http://localhost:5000/user", {
      headers: {
        'Authorization': `Bearer ${token_string}`,
      },
    }).then((resp) => {
      if (resp.ok) resp.json().then((resp) => {
        const url = resp["picture"]
        console.log(url)
        set_img_src(url)
      }).catch((reson) => console.log(reson));
    }).catch((reson) => console.log(reson));
  }

  useEffect(() => {
    const temp_token = localStorage.getItem("token")
    set_token(temp_token)

    if (temp_token != null) load_img(temp_token)

    if (search_params.has("callback") && search_params.get("callback") == "true") {
      const code = sessionStorage.getItem("client_code")
      if (code != null) {
        sessionStorage.removeItem("client_code")
        fetch(`http://localhost:5000/token?client_code=${code}`).then((resp) => {
          if (resp.ok) resp.json().then((resp) => {
            const temp_token = resp['token']
            set_token(temp_token)
            load_img(temp_token)
            localStorage.setItem("token", resp['token'])
          })
        })
      }
    }
  }, [])


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

        <div className='grid grid-cols-2 mt-12 padding-x padding-y max-width' id='sellyourcar'>
          <div className='my-16 ml-24 home__text-container'>
            <h1 className='text-4xl font-extrabold dark:text-white'>Sell your Car</h1>
            <p className="text-xl font-medium dark:text-[#F5F5F5]">Boost your visibility with Milesmart </p>
            <p className="dark:text-[#F5F5F5]">MileSmart offers the finest automated audience selection, guaranteeing genuine and engaged buyers from your local and nearby areas. Sign up now to sell your cars online.</p>
            
          </div>
          <img src="/sellyourcar.png" alt="sellyourcarimage" className="w-full mx-10 " />
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
