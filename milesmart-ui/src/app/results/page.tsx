'use client'

import './styles.css'
import { useEffect, useState } from "react";
import ResultCard from '../components/result_card';

export default function Results() {
    const [objs, setObjs] = useState(Array())
    const [state_open, set_state_open] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://localhost:5000/vehicles')
          if (response.status == 200) setObjs(await response.json())
        }
    
        fetchData().catch((e) => console.log(e))
      }, [])
    
    return (
        <main className="flex flex-col min-h-screen dark:bg-gray-950 dark:text-white">
            <div className="flex flex-col shadow-md h-14 px-4 sticky top-0 backdrop-blur-md z-10 bg-white/80 dark:bg-gray-900/80">
                <div className="flex items-center gap-3 h-full">
                  <div className="pr-2 py-1 text-lg font-bold dark:text-white ">
                    milesmart
                  </div>

                  <div className="grow flex justify-center">
                    <button className='text-center bg-gray-800 max-w-[480px] w-full py-1 rounded-md text-gray-500' onClick={() => {
                      set_state_open(true)
                    }}>Search</button>
                    {/* <input placeholder="Search" className="bg-neutral-100 dark:bg-gray-800 rounded-md px-2 py-1 w-full duration-150 collapse sm:visible max-w-md placeholder:text-center" style={{outline: "none"}}/> */}
                  </div>

                  <div className="flex gap-1">
                    <button className="
                      px-4 py-1 duration-150 rounded-md border
                    text-black dark:text-white 
                    border-black dark:border-gray-400 
                    hover:bg-gray-100 dark:hover:bg-gray-800 
                    active:bg-gray-200 dark:active:bg-gray-700" onClick={ () => {}
                    //   make_notification('Feature Unavailable', 'The Buy feature is under development. Hope the next demo will include that')
                    }>Buy</button>

                    <button className="
                      px-4 py-1 duration-150 rounded-md border
                    text-black dark:text-white 
                    border-black dark:border-gray-400 
                    hover:bg-gray-100 dark:hover:bg-gray-800 
                    active:bg-gray-200 dark:active:bg-gray-700"onClick={ () => {}
                    //   make_notification('Feature Unavailable', 'The Sell feature is under development. Hope the next demo will include that')
                    }>Sell</button>

                    <button className="
                      px-4 py-1 duration-150 rounded-md 
                    text-white  
                    bg-black dark:bg-white/20
                    hover:bg-gray-800 dark:hover:bg-white/25
                    active:bg-gray-700 dark:active:bg-white/30"
                    onClick={ () => {}
                    //   make_notification('Feature Unavailable', 'The Login feature is under development. Hope the next demo will include that')
                    }>Login</button>
                  </div>
                </div>
              </div>

            <div className={"absolute transition-all flex flex-col z-20 md:pr-28 pr-0 w-full h-screen bg-black/30 "+(state_open?"":"hidden")} onClick={() => {
              set_state_open(false);
            }}>
              <div className='bg-gray-800 flex flex-col shadow-lg mt-3 rounded-md w-full max-w-[480px] h-48 place-self-center'>
              <input placeholder="Search" className="bg-neutral-100 dark:bg-gray-700 rounded px-2 py-1 m-1 duration-150 collapse sm:visible placeholder:text-center" style={{outline: "none"}}/>
              </div>
            </div>

            <div className='flex flex-wrap justify-center gap-4 py-16 px-12'>
            {objs.map((vehicle:any, index:number) => {
                return (<ResultCard vehicle={vehicle} />)
            })}
            </div>
            
        </main>
    )
}