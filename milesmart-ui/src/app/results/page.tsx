'use client'

import './styles.css'
import { useEffect, useState } from "react";
import ResultCard from '../components/result_card';
import RangeSlider from '../components/range_slider';
import SearchIcon from '../components/icons/search_icon';

export default function Results() {
    const [objs, setObjs] = useState(Array())
    const [state_open, set_state_open] = useState(false)
    const [pr_max, set_pr_max] = useState(88)
    const [pr_min, set_pr_min] = useState(1)
    const [odo_max, set_odo_max] = useState(300)
    const [odo_min, set_odo_min] = useState(10)
    const [year_max, set_year_max] = useState(2020)
    const [year_min, set_year_min] = useState(2000)
    const [search, set_search] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:5000/vehicles')
        if (response.status == 200) setObjs(await response.json())
      }
  
      fetchData().catch((e) => console.log(e))
    }, [])

    // console.log("Updated")
    
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
                    }}>{search.length == 0? "Search": search}</button>
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

            <div className={"fixed transition-all flex flex-col z-20 md:pr-28 pr-0 w-full h-screen bg-black/50 "+(state_open?"":"hidden")} onClick={() => {
              set_state_open(false);
            }}>
              <div className='bg-gray-800 flex flex-col shadow-lg mt-3 mx-3 rounded-md min-w-[480px] min-h-48 place-self-center' onClick={(e) => {e.stopPropagation()}}>
                <div className='flex flex-row p-1 gap-1'>
                  <input placeholder="Search" className="bg-neutral-100 flex-1 dark:bg-gray-700 rounded px-2 py-1 duration-150 placeholder:text-center" style={{outline: "none"}} value={search} onChange={(e) => {set_search(e.target.value)}} onKeyDownCapture={(e) => {
                    if (e.key == 'Enter') {
                      set_state_open(false)

                      const fetchData = async () => {
                        const response = await fetch(`http://localhost:5000/vehicles?sk=${search}&price_min=${pr_min*1000}&price_max=${pr_max*1000}&year_min=${year_min}&year_max=${year_max}&odo_min=${odo_min*1000}&odo_max=${odo_max*1000}`)
                        if (response.status == 200) setObjs(await response.json())
                      }
                  
                      fetchData().catch((e) => console.log(e))
                    }
                  }}/>
                  <button className='dark:bg-gray-700 rounded flex-none aspect-square h-full
                    px-2 py-2 duration-150
                    fill-black dark:fill-white 
                    hover:bg-gray-300 dark:hover:bg-gray-600 
                    active:bg-gray-400 dark:active:bg-gray-500' onClick={(e) => {
                      set_state_open(false)

                      const fetchData = async () => {
                        const response = await fetch(`http://localhost:5000/vehicles?sk=${search}&price_min=${pr_min*1000}&price_max=${pr_max*1000}&year_min=${year_min}&year_max=${year_max}&odo_min=${odo_min*1000}&odo_max=${odo_max*1000}`)
                        if (response.status == 200) setObjs(await response.json())
                      }
                  
                      fetchData().catch((e) => console.log(e))
                    }}><SearchIcon className='h-4 w-4 mx-auto'/></button>
                </div>
                <div className='flex flex-row p-1 gap-1'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-col bg-gray-700 px-2 py-1 rounded'>
                      <div className='text-sm dark:text-gray-300'>Price Range</div>
                      <div className='py-3 mx-4'><RangeSlider max={90} min={0} value_max={pr_max} value_min={pr_min} onChange={(min: number, max: number) => {
                        // console.log(max)
                        set_pr_min(min)
                        set_pr_max(max)
                      }}/></div>
                      <div className='flex flex-row px-2 mt-1 justify-between'>
                        <div className='text-xs dark:text-gray-400'>{pr_min*1000}</div>
                        <div className='text-xs dark:text-gray-400'>{pr_max*1000}</div>
                      </div>
                    </div>

                    <div className='flex flex-col bg-gray-700 px-2 py-1 rounded'>
                      <div className='text-sm dark:text-gray-300'>Odometer Range</div>
                      <div className='py-3 mx-4'><RangeSlider max={400} min={0} value_max={odo_max} value_min={odo_min} onChange={(min: number, max: number) => {
                        // console.log(max)
                        set_odo_min(min)
                        set_odo_max(max)
                      }}/></div>
                      <div className='flex flex-row px-2 mt-1 justify-between'>
                        <div className='text-xs dark:text-gray-400'>{odo_min*1000}</div>
                        <div className='text-xs dark:text-gray-400'>{odo_max*1000}</div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                  <div className='flex flex-col bg-gray-700 px-2 py-1 rounded'>
                    <div className='text-sm dark:text-gray-300'>Year Range</div>
                      <div className='py-3 mx-4'><RangeSlider max={2024} min={1900} value_max={year_max} value_min={year_min} onChange={(min: number, max: number) => {
                        // console.log(max)
                        set_year_max(max)
                        set_year_min(min)
                      }}/></div>
                      <div className='flex flex-row px-2 mt-1 justify-between'>
                        <div className='text-xs dark:text-gray-400'>{year_min}</div>
                        <div className='text-xs dark:text-gray-400'>{year_max}</div>
                      </div>
                    </div>
                  </div>
                </div>
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