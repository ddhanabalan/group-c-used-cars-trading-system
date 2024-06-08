'use client'

import './styles.css'
import { useCallback, useEffect, useState } from "react";
import ResultCard from '../components/result_card';
import RangeSlider from '../components/range_slider';
import SearchIcon from '../components/icons/search_icon';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Results() {
    const router = useRouter()
    const search_params = useSearchParams()
    const [objs, setObjs] = useState(Array())
    // const [state_open, set_state_open] = useState(false)
    const [pr_max, set_pr_max] = useState(10)
    const [pr_min, set_pr_min] = useState(0)
    const [odo_max, set_odo_max] = useState(10)
    const [odo_min, set_odo_min] = useState(0)
    const [year_max, set_year_max] = useState(100)
    const [year_min, set_year_min] = useState(0)
    const [pr_range_max, set_pr_range_max] = useState<number|undefined>(undefined)
    const [pr_range_min, set_pr_range_min] = useState<number|undefined>(undefined)
    const [odo_range_max, set_odo_range_max] = useState<number|undefined>(undefined)
    const [odo_range_min, set_odo_range_min] = useState<number|undefined>(undefined)
    const [year_range_max, set_year_range_max] = useState<number|undefined>(undefined)
    const [year_range_min, set_year_range_min] = useState<number|undefined>(undefined)
    const [fuel_type_range, set_fuel_type_range] = useState(Array())
    const [fuel_type, set_fuel_type] = useState(Array())
    const [pages, set_pages] = useState(1)
    const [page, set_page] = useState(1)
    const [search, set_search] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/vehicles?${search_params.toString()}`)
        if (response.status == 200) {
          const result = await response.json()
          setObjs(result['results'])
          set_pr_range_max(Math.ceil(result['max_price']/1000))
          set_pr_range_min(Math.floor(result['min_price']/1000))
          set_odo_range_max(Math.ceil(result['max_odometer']/1000))
          set_odo_range_min(Math.floor(result['min_odometer']/1000))
          set_year_range_max(Math.ceil(result['max_year']))
          set_year_range_min(Math.floor(result['min_year']))
          set_pr_max(Math.ceil((search_params.has("price_max")? Number.parseInt(search_params.get("price_max") ?? ""): result['max_price'])/1000))
          set_pr_min(Math.floor((search_params.has("price_min")? Number.parseInt(search_params.get("price_min") ?? ""): result['min_price'])/1000))
          set_odo_max(Math.ceil((search_params.has("odo_max")? Number.parseInt(search_params.get("odo_max") ?? ""): result['max_odometer'])/1000))
          set_odo_min(Math.floor((search_params.has("odo_min")? Number.parseInt(search_params.get("odo_min") ?? ""): result['min_odometer'])/1000))
          set_year_max(search_params.has("year_max")? Number.parseInt(search_params.get("year_max") ?? ""): Math.ceil(result['max_year']))
          set_year_min(search_params.has("year_min")? Number.parseInt(search_params.get("year_min") ?? ""): Math.floor(result['min_year']))
          set_fuel_type_range(result['fuel_types'])
          set_fuel_type(search_params.has("fuel_types")? search_params.get("fuel_types")?.split(",") ?? Array(): Array())
          set_pages(result['pages'])
          set_page(search_params.has("page")? Number.parseInt(search_params.get("page")??"0")+1: 1)
          set_search(search_params.has("sk")? search_params.get("sk")?? "": "")
        }
      }
  
      fetchData().catch((e) => console.log(e))
    }, [])

    function validate_max(current: number, c_min: number, c_max: number) {
      return Math.max(Math.min(current, c_max), c_min+1)
    }

    function validate_min(current: number, c_min: number, c_max: number) {
      return Math.max(Math.min(current, c_max-1), c_min)
    }

    const fetchData = async (_page:number = -1) => {
      if (_page != -1) set_page(_page)
      var query = `page=${_page == -1? page-1: _page-1}`
      var url = `http://localhost:5000/vehicles`
      console.log(search.length > 0)
      if (search.length > 0) query = `${query}&sk=${search}`
      if (pr_range_max != undefined && pr_max < pr_range_max) query = `${query}&price_max=${pr_max*1000}`
      if (pr_range_min != undefined && pr_min > pr_range_min) query = `${query}&price_min=${pr_min*1000}`
      if (odo_range_max != undefined && odo_max < odo_range_max) query = `${query}&odo_max=${odo_max*1000}`
      if (odo_range_min != undefined && odo_min > odo_range_min) query = `${query}&odo_min=${odo_min*1000}`
      if (year_range_max != undefined && year_max < year_range_max) query = `${query}&year_max=${year_max}`
      if (year_range_min != undefined && year_min > year_range_min) query = `${query}&year_min=${year_min}`
      if (fuel_type.length > 0) query = `${query}&fuel_types=${fuel_type.join(',')}`
      const response = await fetch(`${url}?${query}`)
      if (response.status == 200) {
        const result = await response.json()
        setObjs(result['results'])
        var c_pr_max_range = Math.ceil(result['max_price']/1000)
        var c_pr_min_range = Math.floor(result['min_price']/1000)
        var c_odo_max_range = Math.ceil(result['max_odometer']/1000)
        var c_odo_min_range = Math.floor(result['min_odometer']/1000)
        var c_year_max_range = Math.ceil(result['max_year'])
        var c_year_min_range = Math.floor(result['min_year'])
        set_pr_range_max(c_pr_max_range)
        set_pr_range_min(c_pr_min_range)
        set_odo_range_max(c_odo_max_range)
        set_odo_range_min(c_odo_min_range)
        set_year_range_max(c_year_max_range)
        set_year_range_min(c_year_min_range)
        set_fuel_type_range(result['fuel_types'])
        set_pr_max((pr_range_max != undefined && pr_max < pr_range_max)? Math.max(Math.min(pr_max, c_pr_max_range), c_pr_min_range+1): c_pr_max_range)
        set_pr_min((pr_range_min != undefined && pr_min > pr_range_min)? Math.max(Math.min(pr_min, c_pr_max_range-1), c_pr_min_range): c_pr_min_range)
        set_odo_max((odo_range_max != undefined && odo_max < odo_range_max)? Math.max(Math.min(odo_max, c_odo_max_range), c_odo_min_range+1): c_odo_max_range)
        set_odo_min((odo_range_min != undefined && odo_min > odo_range_min)? Math.max(Math.min(odo_min, c_odo_max_range-1), c_odo_min_range): c_odo_min_range)
        set_year_max((year_range_max != undefined && year_max < year_range_max)? Math.max(Math.min(year_max, c_year_max_range), c_year_min_range+1): c_year_max_range)
        set_year_min((year_range_min != undefined && year_min > year_range_min)? Math.max(Math.min(year_min, c_year_max_range-1), c_year_min_range): c_year_min_range)
        // set_odo_max((odo_range_max != undefined && odo_max < odo_range_max)? Math.min(odo_max, c_odo_max_range): c_odo_max_range)
        // set_odo_min((odo_range_min != undefined && odo_min > odo_range_min)? Math.max(odo_min, c_odo_min_range): c_odo_min_range)
        set_year_max((year_range_max != undefined && year_max < year_range_max)? Math.min(year_max, c_year_max_range): c_year_max_range)
        set_year_min((year_range_min != undefined && year_min > year_range_min)? Math.max(year_min, c_year_min_range): c_year_min_range)
        set_fuel_type(fuel_type.filter((v) => fuel_type_range.includes(v)))
        set_pages(result['pages'])
      }

      router.push(`/results?${query}`)
    }
    
    return (
        <main className="flex flex-col min-h-screen dark:bg-gray-950 dark:text-white">
          <div className="flex flex-none flex-col shadow-md h-14 px-4 sticky top-0 backdrop-blur-md z-10 bg-white/80 dark:bg-gray-900/80">
            <div className="flex items-center gap-3 h-full">
              <div className="pr-2 py-1 text-lg font-bold dark:text-white ">
                milesmart
              </div>

              <div className="grow flex justify-center">
              <input placeholder="Search" className="dark:bg-gray-800 bg-gray-200 flex-1 max-w-[480px] w-full rounded-md px-2 py-1 duration-150 placeholder:text-gray-500 placeholder:text-center text-center" style={{outline: "none"}} value={search} onChange={(e) => {set_search(e.target.value)}} onKeyDownCapture={(e) => {
                  if (e.key == 'Enter') {
                    // set_state_open(false)
                    fetchData().catch((e) => console.log(e))
                  }
                }}/>
                {/* <button className='text-center dark:bg-gray-800 bg-gray-200 max-w-[480px] w-full py-1 rounded-md text-gray-500' onClick={() => {
                  set_state_open(true)
                }}>{search.length == 0? "Search": search}</button> */}
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

          {/* <div className={"fixed transition-all flex flex-col z-20 md:pr-28 pr-0 w-full h-screen bg-black/50 "+(state_open?"":"hidden")} onClick={() => {
            set_state_open(false);
          }}>
            <div className='bg-gray-800 flex flex-col shadow-lg mt-3 mx-3 rounded-md min-w-[480px] min-h-48 place-self-center' onClick={(e) => {e.stopPropagation()}}>
              <div className='flex flex-row p-1 gap-1'>
                <input placeholder="Search" className="bg-neutral-100 flex-1 dark:bg-gray-700 rounded px-2 py-1 duration-150 placeholder:text-center" style={{outline: "none"}} value={search} onChange={(e) => {set_search(e.target.value)}} onKeyDownCapture={(e) => {
                  if (e.key == 'Enter') {
                    set_state_open(false)

                    const fetchData = async () => {
                      var url = `http://localhost:5000/vehicles?sk=${search}`
                      if (pr_max < pr_range_max) url = `${url}&price_max=${pr_max*1000}`
                      if (pr_min > pr_range_min) url = `${url}&price_min=${pr_min*1000}`
                      if (odo_max < odo_range_max) url = `${url}&odo_max=${odo_max*1000}`
                      if (odo_min > odo_range_min) url = `${url}&odo_min=${odo_min*1000}`
                      if (year_max < year_range_max) url = `${url}&year_max=${year_max*1000}`
                      if (year_min > year_range_min) url = `${url}&year_min=${year_min}`
                      const response = await fetch(url)
                      if (response.status == 200) {
                        const result = await response.json()
                        setObjs(result['results'])
                        var c_pr_max_range = Math.ceil(result['max_price']/1000)
                        var c_pr_min_range = Math.floor(result['min_price']/1000)
                        var c_odo_max_range = Math.ceil(result['max_odometer']/1000)
                        var c_odo_min_range = Math.floor(result['min_odometer']/1000)
                        var c_year_max_range = Math.ceil(result['max_year'])
                        var c_year_min_range = Math.floor(result['min_year'])
                        set_pr_range_max(c_pr_max_range)
                        set_pr_range_min(c_pr_min_range)
                        set_odo_range_max(c_odo_max_range)
                        set_odo_range_min(c_odo_min_range)
                        set_year_range_max(c_year_max_range)
                        set_year_range_min(c_year_min_range)
                        set_pr_max(Math.min(pr_max, c_pr_max_range))
                        set_pr_min(Math.max(pr_min, c_pr_min_range))
                        set_odo_max(Math.min(odo_max, c_odo_max_range))
                        set_odo_min(Math.max(odo_min, c_odo_min_range))
                        set_year_max(Math.min(year_max, c_year_max_range))
                        set_year_min(Math.max(year_min, c_year_min_range))
                      }
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
                    }}/>
                  </div>
                  <div className='flex flex-row px-2 mt-1 justify-between'>
                    <div className='text-xs dark:text-gray-400'>{year_min}</div>
                    <div className='text-xs dark:text-gray-400'>{year_max}</div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className='flex flex-1 flex-col h-max sm:flex-row px-6 py-12 gap-8'>
            <div className='flex flex-none h-[77vh] top-24 items-center sm:sticky'>
              <div className='flex flex-col flex-none min-w-64 min-h-32 h-max rounded-md px-2 py-4 gap-2 dark:bg-gray-900 bg-white dark:border-none border shadow'>
                <div className=' self-center mb-1'>Filters</div>
                { pr_range_max != undefined && pr_range_min != undefined && pr_range_max-pr_range_min >= 2 ? (
                  <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                    <div className='text-sm dark:text-gray-300'>Price Range</div>
                    <div className='py-3 mx-4 self-center'>
                      <RangeSlider max={pr_range_max} min={pr_range_min} value_max={pr_max} value_min={pr_min} onChange={(min: number, max: number) => {
                        // console.log(max)
                        set_pr_min(min)
                        set_pr_max(max)
                      }}/>
                    </div>
                    <div className='flex flex-row px-2 mt-1 justify-between'>
                      <div className='text-xs dark:text-gray-400'>{pr_min*1000}</div>
                      <div className='text-xs dark:text-gray-400'>{pr_max*1000}</div>
                    </div>
                  </div>
                ): <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                  <div className='text-xs text-center text-gray-400 dark:text-gray-500'>Price Range Filter Not Applicable</div>
                </div> }
                { odo_range_max != undefined && odo_range_min != undefined && odo_range_max-odo_range_min >= 2 ? (
                  <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                    <div className='text-sm dark:text-gray-300'>Odometer Range</div>
                    <div className='py-3 mx-4 self-center'>
                      <RangeSlider max={odo_range_max} min={odo_range_min} value_max={odo_max} value_min={odo_min} onChange={(min: number, max: number) => {
                        // console.log(max)
                        set_odo_min(min)
                        set_odo_max(max)
                      }}/>
                    </div>
                    <div className='flex flex-row px-2 mt-1 justify-between'>
                      <div className='text-xs dark:text-gray-400'>{odo_min*1000}</div>
                      <div className='text-xs dark:text-gray-400'>{odo_max*1000}</div>
                    </div>
                  </div>
                ): <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                  <div className='text-xs text-center text-gray-400 dark:text-gray-500'>Odometer Range Filter Not Applicable</div>
                </div> }
                { year_range_max != undefined && year_range_min != undefined && year_range_max-year_range_min >= 2 ? (
                  <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                  <div className='text-sm dark:text-gray-300'>Year Range</div>
                  <div className='py-3 mx-4 self-center'>
                    <RangeSlider max={year_range_max} min={year_range_min} value_max={year_max} value_min={year_min} onChange={(min: number, max: number) => {
                      // console.log(max)
                      set_year_max(max)
                      set_year_min(min)
                    }}/>
                  </div>
                  <div className='flex flex-row px-2 mt-1 justify-between'>
                    <div className='text-xs dark:text-gray-400'>{year_min}</div>
                    <div className='text-xs dark:text-gray-400'>{year_max}</div>
                  </div>
                </div>
                ): <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                  <div className='text-xs text-center text-gray-400 dark:text-gray-500'>Year Range Filter Not Applicable</div>
                </div> }
                { fuel_type_range.length > 1 || fuel_type.length > 0? (
                  <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                    <div className='text-sm dark:text-gray-300'>Fuel Types</div>
                    <div className='grid grid-cols-2 gap-1 pt-2'>
                      {fuel_type_range.map((entry:any, index:number) => {
                        return (<div className='flex gap-1' key={index}><input type="checkbox" checked={fuel_type.includes(entry)} value={entry} onChange={(e) => {
                          if (e.target.checked) set_fuel_type(fuel_type.concat(e.target.value))
                          else set_fuel_type(fuel_type.filter((value) => value != e.target.value))
                        }}/><span>{entry}</span></div>)
                      })}
                    </div>
                  </div>
                ): <div className='flex flex-col dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                <div className='text-xs text-center text-gray-400 dark:text-gray-500'>Fuel Filter Not Applicable</div>
              </div> }
                  
                <button className='rounded px-4 py-1.5 
                text-white  
                bg-black dark:bg-white/10
                hover:bg-gray-800 dark:hover:bg-white/15
                active:bg-gray-700 dark:active:bg-white/20' onClick={() => {
                  fetchData()
                }}>Apply Filters</button>
              </div>
            </div>
              
            <div className='flex flex-col gap-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 container place-self-center gap-4'>
                {objs.map((vehicle:any, index:number) => {
                    return (<ResultCard vehicle={vehicle} key={index}/>)
                })}
              </div>
              {objs.length > 0? (
                <div className='flex justify-between h-min-16 w-min-16'>
                <button disabled={page-1 <= 0} className='rounded px-4 py-1.5 
                  dark:text-white disabled:dark:text-gray-400 disabled:text-gray-500
                  bg-gray-200 dark:bg-gray-900
                  hover:bg-gray-300 dark:hover:bg-gray-800 disabled:hover:bg-gray-200 disabled:dark:hover:bg-gray-900
                  active:bg-gray-400 dark:active:bg-gray-700 disabled:active:bg-gray-200 disabled:dark:active:bg-gray-900' onClick={() => {
                    fetchData(page-1)
                  }}>Previous Page</button>
                <div className='bg-gray-200 dark:bg-gray-900 rounded-md h-min self-center px-4 py-1.5'>Page {page}/{pages}</div>
                <button disabled={page >= pages} className='rounded px-4 py-1.5 
                  dark:text-white disabled:dark:text-gray-400 disabled:text-gray-500
                  bg-gray-200 dark:bg-gray-900
                  hover:bg-gray-300 dark:hover:bg-gray-800 disabled:hover:bg-gray-200 disabled:dark:hover:bg-gray-900
                  active:bg-gray-400 dark:active:bg-gray-700 disabled:active:bg-gray-200 disabled:dark:active:bg-gray-900' onClick={() => {
                    fetchData(page+1)
                }}>Next Page</button>
              </div>
              ): (<div/>)} 
            </div>
          </div>
        </main>
    )
}