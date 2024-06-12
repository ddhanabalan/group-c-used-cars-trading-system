"use client"

import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import Popularcar from "./components/Popularcar";
import Premiumcar from "./components/Premiumcar";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image"


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
    <main className='flex flex-col min-h-screen'>
      <div className="flex flex-none flex-col h-14 px-4 sticky top-0 backdrop-blur-md z-10 bg-white/80 shadow dark:bg-gray-900/70">
        <div className="flex items-center gap-3 h-full">
          <div className="pr-2 py-1 text-lg font-bold dark:text-white ">
            milesmart
          </div>

          <div className="grow flex justify-center">
          <input placeholder="Search" className="dark:bg-gray-800 bg-gray-200 flex-1 max-w-[480px] w-full rounded-md px-2 py-1 duration-150 placeholder:text-gray-500 placeholder:text-center text-center" style={{outline: "none"}} value={search} onChange={(e) => {set_search(e.target.value)}} onKeyDownCapture={(e) => {
              if (e.key == 'Enter') {
                // set_state_open(false)
                router.push(`results?sk=${search}`)
              }
            }}/>
          </div>

          <div className="flex gap-1">
            <button className="
              px-4 py-1 duration-150 rounded-md border
            text-black dark:text-white 
            border-black dark:border-gray-400 
            hover:bg-gray-100 dark:hover:bg-gray-800 
            active:bg-gray-200 dark:active:bg-gray-700" onClick={ () => {
              router.push(`results`)
            }}>Buy</button>

            <button className="
              px-4 py-1 duration-150 rounded-md border
            text-black dark:text-white 
            border-black dark:border-gray-400 
            hover:bg-gray-100 dark:hover:bg-gray-800 
            active:bg-gray-200 dark:active:bg-gray-700"onClick={ () => {}
            //   make_notification('Feature Unavailable', 'The Sell feature is under development. Hope the next demo will include that')
            }>Sell</button>

            <button className={`
              px-4 py-1 duration-150 rounded-md 
            text-white  
            bg-black dark:bg-white/20
            hover:bg-gray-800 dark:hover:bg-white/25
            active:bg-gray-700 dark:active:bg-white/30 `+(token == null? "": "hidden")}
            onClick={() => {
              const splits = window.location.href.split("?", 2)
              fetch("http://localhost:5000/client_code", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${btoa('clientweb1:password1')}`,
                },
                body: JSON.stringify({
                  "client_type": "web",
                  "redirect_uri": `${splits[0]}?callback=true${splits.length > 1? "&"+splits[1]: "" }`
                })
              }).then((resp) => {
                if (resp.ok) resp.json().then((resp) => {
                  const client_code = resp["client_code"]
                  console.log(client_code)
                  sessionStorage.setItem("client_code", client_code)
                  router.push(`http://localhost:5000/login?client_code=${client_code}`);
                  console.log("Working")
                }).catch((reson) => console.log(reson));
              }).catch((reson) => console.log(reson));
            }}>Login</button>

          <Image alt="profile_image" width={-1} height={-1} src={img_src} className={"w-full h-9 rounded-full mx-2 overflow-clip object-cover hover:outline-2 hover:outline-black "+(token == null? "hidden": "")} onClick={() => {
            router.push("profilepage")
          }}/>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden  ">
        <div className="">
          <Hero />
        </div>

        <div className='mt-12 padding-x padding-y max-width bg-[#F5F5F5]' id='feature'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>How Milesmart Works</h1>
            <p>You’ll love the way you buy the car more than your car ! </p>
          </div>
          <Hero2 />
        </div>

        <div className='mt-12 padding-x padding-y max-width w-max bg-slate-200' id='Suggested'>
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Suggested</h1>
            <p>We recommend checking out what's in your vicinity </p>
            
          </div>
        </div>

        <div className='grid grid-cols-2 mt-12 padding-x padding-y max-width' id='sellyourcar'>
          <div className='my-16 ml-24 home__text-container'>
            <h1 className='text-4xl font-extrabold'>Sell your Car</h1>
            <p className="text-xl font-medium ">Boost your visibility with Milesmart </p>
            <p className="">MileSmart offers the finest automated audience selection, guaranteeing genuine and engaged buyers from your local and nearby areas. Sign up now to sell your cars online.</p>
            
          </div>
          <img src="/sellyourcar.jpg" alt="sellyourcarimage" className="w-3/4 mx-10 " />
        </div>

        <div className='mt-12 padding-x padding-y max-width' id='popularcars'>
          <div className='flex items-center justify-center '>
            <h1 className='text-5xl font-extrabold text-center '>Popular Brands. You might like.</h1>
          </div>
          <Popularcar />
        </div>

        <div className='mt-12 padding-x padding-y max-width' id='popularcars'>
          <div className='flex items-center justify-center '>
            <h1 className='text-5xl font-extrabold text-center '>Begin Your Search for Premium Cars</h1>
          </div>
          <Premiumcar />
        </div>
      </div>
      
    </main>
  );
}
