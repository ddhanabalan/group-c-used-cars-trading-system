'use client'

import { ComponentAttributes } from "@/components/atrributes"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import RangeSlider from "./range_slider"

function UnavailableText({value, hidden}: ComponentAttributes & {value: string}) {
    return <div hidden={hidden} className='text-xs text-center text-gray-400 dark:text-gray-500'>{value}</div>
}

function MinMaxDisplay({hidden, className, min, max}: ComponentAttributes & { min: number, max: number }) {
    if (hidden) return <div hidden />
    return (
        <div className={`flex flex-row px-2 justify-between ${className}`}>
            <div className='text-xs dark:text-gray-400'>{min}</div>
            <div className='text-xs dark:text-gray-400'>{max}</div>
        </div>
    )
}

export type FilterAttributes = {
    pr_min?: number,
    odo_min?: number,
    year_min?: number,
    pr_max?: number,
    odo_max?: number,
    year_max?: number,
    fuel_types?: string[]
}

export function FilterBox({hidden, className, ranges}: ComponentAttributes & { ranges: FilterAttributes }) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();
    
    const [pr_max, set_pr_max] = useState(searchParams.has('pr_max')? Number.parseInt(searchParams.get('pr_max') ?? '0'): ranges.pr_max ?? 0);
    const [pr_min, set_pr_min] = useState(searchParams.has('pr_min')? Number.parseInt(searchParams.get('pr_min') ?? '0'): ranges.pr_min ?? 0);
    const [odo_max, set_odo_max] = useState(searchParams.has('odo_max')? Number.parseInt(searchParams.get('odo_max') ?? '0'): ranges.odo_max ?? 0);
    const [odo_min, set_odo_min] = useState(searchParams.has('odo_min')? Number.parseInt(searchParams.get('odo_min') ?? '0'): ranges.odo_min ?? 0);
    const [year_max, set_year_max] = useState(searchParams.has('year_max')? Number.parseInt(searchParams.get('year_max') ?? '0'): ranges.year_max ?? 0);
    const [year_min, set_year_min] = useState(searchParams.has('year_min')? Number.parseInt(searchParams.get('year_min') ?? '0'): ranges.year_min ?? 0);
    const [fuel_types, set_fuel_types] = useState(searchParams.get('fuel_types')?.split(',') ?? [])

    const price_unavailable = ranges.pr_max == undefined || ranges.pr_min == undefined || ranges.pr_max-ranges.pr_min < 2;
    const odo_unavailable = ranges.odo_max == undefined || ranges.odo_min == undefined || ranges.odo_max-ranges.odo_min < 2;
    const year_unavailable = ranges.year_max == undefined || ranges.year_min == undefined || ranges.year_max-ranges.year_min < 2;
    const fuel_unavailable = (ranges.fuel_types?.length ?? 0) <= 1 && (fuel_types?.length ?? 0) <= 0;
    
    if (hidden) return <div hidden />

    return (
        <div className={`flex flex-col h-max w-min rounded-xl p-4 gap-2 dark:bg-white/5 bg-white ${className}`}>
            <div className='self-center mb-1'>Filters</div>
            <div className='flex flex-col flex-none h-max min-w-64 min-h-32 gap-2'>
                <div className='flex flex-col h-min gap-2'>
                    <div className='flex flex-col dark:bg-white/10 bg-neutral-200 px-2 py-1 rounded'>
                        <div hidden={price_unavailable} className='text-sm dark:text-gray-300'>Price Range</div>
                        <div hidden={price_unavailable} className='py-3 mx-4 self-center'>
                            <RangeSlider max={ranges.pr_max} min={ranges.pr_min} value_max={pr_max} value_min={pr_min} onChange={(min: number, max: number) => {
                                // console.log(max)
                                set_pr_min(min)
                                set_pr_max(max)
                            }}/>
                        </div>
                        <MinMaxDisplay hidden={price_unavailable} min={pr_min*1000} max={pr_max*1000} className="mt-1" />
                        <UnavailableText hidden={!price_unavailable} value="Price Range Filter Not Applicable"/>
                    </div>
                    <div className='flex flex-col dark:bg-white/10 bg-neutral-200 px-2 py-1 rounded'>
                        <div hidden={odo_unavailable} className='text-sm dark:text-gray-300'>Odometer Range</div>
                        <div hidden={odo_unavailable} className='py-3 mx-4 self-center'>
                            <RangeSlider max={ranges.odo_max} min={ranges.odo_min} value_max={odo_max} value_min={odo_min} onChange={(min: number, max: number) => {
                            // console.log(max)
                            set_odo_min(min)
                            set_odo_max(max)
                            }}/>
                        </div>
                        <MinMaxDisplay hidden={odo_unavailable} min={odo_min*1000} max={odo_max*1000} className="mt-1" />
                        <UnavailableText hidden={!odo_unavailable} value="Odometer Range Filter Not Applicable" />
                    </div>
                    <div className='flex flex-col dark:bg-white/10 bg-neutral-200 px-2 py-1 rounded'>
                        <div hidden={year_unavailable} className='text-sm dark:text-gray-300'>Year Range</div>
                        <div hidden={year_unavailable} className='py-3 mx-4 self-center'>
                            <RangeSlider max={ranges.year_max} min={ranges.year_min} value_max={year_max} value_min={year_min} onChange={(min: number, max: number) => {
                                // console.log(max)
                                set_year_max(max)
                                set_year_min(min)
                            }}/>
                        </div>
                        <MinMaxDisplay hidden={year_unavailable} min={year_min} max={year_max} className="mt-1" />
                        <UnavailableText hidden={!year_unavailable} value="Year Range Filter Not Applicable" />
                    </div>
                </div>
                <div className='flex flex-1'>
                    <div className='flex flex-col flex-1 dark:bg-white/10 bg-neutral-200 px-2 py-1 rounded'>
                        <div hidden={fuel_unavailable} className='text-sm dark:text-gray-300'>Fuel Types</div>
                        <div className={`${fuel_unavailable? 'hidden': 'grid'} grid-cols-2 gap-1 pt-2`}>
                            {ranges.fuel_types?.map((entry:any, index:number) => {
                            return (<div className='flex gap-1' key={index}><input type="checkbox" checked={fuel_types.includes(entry)} value={entry} onChange={(e) => {
                                if (e.target.checked) set_fuel_types(fuel_types.concat(e.target.value))
                                else set_fuel_types(fuel_types.filter((value) => value != e.target.value))
                            }}/><span>{entry}</span></div>)
                            })}
                        </div>
                        <UnavailableText hidden={!fuel_unavailable} value="Fuel Filter Not Applicable" />
                    </div>
                </div>
            </div>
            <button className='rounded px-4 py-1.5 
                text-white  
                bg-black dark:bg-white/10
                hover:bg-gray-800 dark:hover:bg-white/15
                active:bg-gray-700 dark:active:bg-white/20' onClick={() => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    const dialog_opened = newSearchParams.has('filter_dialog');
                    if (pr_max < (ranges.pr_max ?? pr_max)) newSearchParams.set('pr_max', pr_max.toString());
                    if (odo_max < (ranges.odo_max ?? odo_max)) newSearchParams.set('odo_max', odo_max.toString());
                    if (year_max < (ranges.year_max ?? year_max)) newSearchParams.set('year_max', year_max.toString());
                    if (pr_min > (ranges.pr_min ?? pr_min)) newSearchParams.set('pr_min', pr_min.toString());
                    if (odo_min > (ranges.odo_min ?? odo_min)) newSearchParams.set('odo_min', odo_min.toString());
                    if (year_min > (ranges.year_min ?? year_min)) newSearchParams.set('year_min', year_min.toString());

                    if (pr_max == ranges.pr_max) newSearchParams.delete('pr_max');
                    if (odo_max == ranges.odo_max) newSearchParams.delete('odo_max');
                    if (year_max == ranges.year_max) newSearchParams.delete('year_max');
                    if (pr_min == ranges.pr_min) newSearchParams.delete('pr_min');
                    if (odo_min == ranges.odo_min) newSearchParams.delete('odo_min');
                    if (year_min == ranges.year_min) newSearchParams.delete('year_min');

                    if (fuel_types.length > 0) newSearchParams.set('fuel_types', fuel_types.join(',')); else newSearchParams.delete('fuel_types');
                    
                    newSearchParams.delete('filter_dialog');
                    if (dialog_opened) router.back();
                    router.replace(`${path}?${newSearchParams}`)
                }}>Apply</button>
        </div>
    )
}