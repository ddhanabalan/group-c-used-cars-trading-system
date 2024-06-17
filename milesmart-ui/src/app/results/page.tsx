'use client'

import './styles.css'
import { useEffect, useState } from "react";
import ResultCard from '../components/result_card';
import RangeSlider from '../components/range_slider';
import { useRouter, useSearchParams } from 'next/navigation';
import HeaderBar from '../components/header_bar';

export default function Results() {
    const router = useRouter()
    const search_params = useSearchParams()
    const [objs, setObjs] = useState(Array())
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
        set_page(search_params.has("page")? Number.parseInt(search_params.get("page")??"0")+1: 1)
        set_search(search_params.has("sk")? search_params.get("sk")?? "": "") 
        const response = await fetch(`http://localhost:5000/vehicles?${search_params.toString()}`)
        if (response.ok) {
          const result = await response.json()
          setObjs(result['results'])
          set_pr_range_max(Math.ceil(result['max_price']/1000))
          set_pr_range_min(Math.floor(result['min_price']/1000))
          set_odo_range_max(Math.ceil(result['max_odometer']/1000))
          set_odo_range_min(Math.floor(result['min_odometer']/1000))
          set_year_range_max(Math.ceil(result['max_year']))
          set_year_range_min(Math.floor(result['min_year']))
          set_fuel_type_range(result['fuel_types'])
          set_pr_max(Math.ceil((search_params.has("price_max")? Number.parseInt(search_params.get("price_max") ?? ""): result['max_price'])/1000))
          set_pr_min(Math.floor((search_params.has("price_min")? Number.parseInt(search_params.get("price_min") ?? ""): result['min_price'])/1000))
          set_odo_max(Math.ceil((search_params.has("odo_max")? Number.parseInt(search_params.get("odo_max") ?? ""): result['max_odometer'])/1000))
          set_odo_min(Math.floor((search_params.has("odo_min")? Number.parseInt(search_params.get("odo_min") ?? ""): result['min_odometer'])/1000))
          set_year_max(search_params.has("year_max")? Number.parseInt(search_params.get("year_max") ?? ""): Math.ceil(result['max_year']))
          set_year_min(search_params.has("year_min")? Number.parseInt(search_params.get("year_min") ?? ""): Math.floor(result['min_year']))
          set_fuel_type(search_params.has("fuel_types")? search_params.get("fuel_types")?.split(",") ?? Array(): Array())
          set_pages(result['pages'])
        }
      }
  
      fetchData().catch((e) => console.log(e))
    }, [search_params])

    const fetchData = async (_page:number = -1) => {
      // if (_page != -1) set_page(_page)
      var query = `page=${_page == -1? page-1: _page-1}`
      if (search.length > 0) query = `${query}&sk=${search}`
      if (pr_range_max != undefined && pr_max < pr_range_max) query = `${query}&price_max=${pr_max*1000}`
      if (pr_range_min != undefined && pr_min > pr_range_min) query = `${query}&price_min=${pr_min*1000}`
      if (odo_range_max != undefined && odo_max < odo_range_max) query = `${query}&odo_max=${odo_max*1000}`
      if (odo_range_min != undefined && odo_min > odo_range_min) query = `${query}&odo_min=${odo_min*1000}`
      if (year_range_max != undefined && year_max < year_range_max) query = `${query}&year_max=${year_max}`
      if (year_range_min != undefined && year_min > year_range_min) query = `${query}&year_min=${year_min}`
      if (fuel_type.length > 0) query = `${query}&fuel_types=${fuel_type.join(',')}`

      const sk = search_params.has("sk")? search_params.get("sk"): ""
      if (sk == search && search_params.size > 0) router.replace(`/results?${query}`)
      else router.push(`/results?${query}`)
    }
    
    return (
        <main className="flex flex-col min-h-screen bg-slate-100 dark:bg-gray-950 dark:text-white">
          <HeaderBar search={search} on_search_changed={(sk) => set_search(sk)} on_search={ () => fetchData() }/>

          <div className='flex flex-1 flex-col sm:flex-row h-max py-6'>
            <div className='flex flex-col flex-none sm:h-[77vh] sm:top-20 sm:items-center sm:sticky'>
              <div className='flex flex-col flex-none h-max rounded-2xl sm:rounded-l-none m-4 sm:pl-12 sm:pr-4 px-4 py-4 sm:m-0 gap-2 dark:bg-gray-900 bg-white dark:border-none sm:border sm:shadow'>
                <div className='self-center mb-1'>Filters</div>
                <div className='flex flex-row sm:flex-col flex-none h-max min-w-64 min-h-32 gap-2'>
                  <div className='flex flex-col h-min gap-2'>
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
                      </div> 
                    }
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
                      </div> 
                    }
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
                      </div> 
                    }
                  </div>
                  <div className='flex flex-1'>
                    { fuel_type_range.length > 1 || fuel_type.length > 0? (
                      <div className='flex flex-col flex-1 dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                        <div className='text-sm dark:text-gray-300'>Fuel Types</div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 pt-2'>
                          {fuel_type_range.map((entry:any, index:number) => {
                            return (<div className='flex gap-1' key={index}><input type="checkbox" checked={fuel_type.includes(entry)} value={entry} onChange={(e) => {
                              if (e.target.checked) set_fuel_type(fuel_type.concat(e.target.value))
                              else set_fuel_type(fuel_type.filter((value) => value != e.target.value))
                            }}/><span>{entry}</span></div>)
                          })}
                        </div>
                      </div>
                    ): <div className='flex flex-col h-min flex-1 dark:bg-gray-800 bg-gray-200 px-2 py-1 rounded'>
                        <div className='text-xs text-center text-gray-400 dark:text-gray-500'>Fuel Filter Not Applicable</div>
                      </div> 
                    }
                  </div>
                </div>
                <button className='rounded px-4 py-1.5 
                  text-white  
                  bg-black dark:bg-white/10
                  hover:bg-gray-800 dark:hover:bg-white/15
                  active:bg-gray-700 dark:active:bg-white/20' onClick={() => {
                    fetchData()
                  }}>Apply</button>
              </div>
            </div>
              
            <div className='flex flex-1 justify-between flex-col gap-8 p-8 m-4 sm:my-0 sm:mr-0 bg-white dark:bg-gray-900 rounded-2xl sm:rounded-r-none'>
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