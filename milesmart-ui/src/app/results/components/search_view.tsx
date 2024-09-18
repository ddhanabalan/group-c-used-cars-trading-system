'use client'

import { Pagination } from "@/components/client/pagination"
import { VehicleCard } from "@/components/client/vehicle_card"
import { FilterBox } from "./filter_box"
import { FilterDialog } from "./filter_dialog"
import { ComponentAttributes, SearchResult, Vehicle } from "@/components/atrributes"
import { MouseEvent, useState } from 'react'

function FilterIcon({className}: ComponentAttributes) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 -960 960 960"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>
    )
}

export function SearchView({ result, authenticated }: ComponentAttributes & { result: SearchResult<Vehicle>, authenticated: boolean }) {
    const [dialogHidden, setDialogHidden] = useState(true);

    const ranges = {
		"pr_min": Math.floor((result.min_price ?? 0)/1000),
		"odo_min": Math.floor((result.min_odometer ?? 0)/1000),
		"year_min": result.min_year,
		"pr_max": Math.ceil((result.max_price ?? 0)/1000),
		"odo_max": Math.ceil((result.max_odometer ?? 0)/1000),
		"year_max": result.max_year,
		"fuel_types": result.fuel_types
	}

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setDialogHidden(false);
    }

    return (
		<div className="flex flex-col flex-1">
			<div className='flex flex-1 flex-col sm:flex-row h-max py-6 px-4 gap-6'>
				<div className={`hidden sm:flex flex-col flex-none sm:h-[77vh] sm:top-20 sm:items-center sm:sticky`}>
					<FilterBox ranges={ranges} className='flex-none'/>
				</div>
					
				<div className='flex flex-1 justify-between flex-col gap-4'>
					<div className="flex flex-col flex-1 bg-white dark:bg-white/5 overflow-clip rounded-xl">
						<div className="flex justify-between items-center h-16 px-5 py-3 border-b-2 dark:border-neutral-700">
							<div className="dark:text-white pt-1">Found {result.count} Results</div>
							<button className={`
                            flex sm:hidden items-center gap-1 pl-2 pr-4 py-1.5 duration-150 rounded-md
                            text-white fill-white 
                            bg-black dark:bg-white/20
                            hover:bg-gray-800 dark:hover:bg-white/25
                            active:bg-gray-700 dark:active:bg-white/30`} 
                            onClick={handleClick}>
                                <FilterIcon className="h-5 w-5" />
                                <div className="">Filters</div>
                            </button>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:max-h-search-view overflow-auto gap-4 p-8'>
							{result.results.map((vehicle, index) => {
								return <VehicleCard vehicle={vehicle} key={index} authenticated={authenticated}/>
							})}
						</div>
					</div>
					
					<Pagination maxPages={result.pages}/>
				</div>
			</div>

			<FilterDialog hidden={dialogHidden} ranges={ranges} onCancelled={() => setDialogHidden(true)}/>
		</div>
	)
}