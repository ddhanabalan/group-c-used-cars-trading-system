import { Suspense } from "react";
import { HeaderBar } from "@/components/server/header_bar";
import { VehicleCardSkeleton } from "@/components/skeletons/vehicle_card";
import { FilterBoxSkeleton } from "./components/filter_box_skel";
import { backendFetch } from "../actions";
import { SearchResult, Vehicle } from "@/components/atrributes";
import { SearchView } from "./components/search_view";

type SearchParamsAttributes = { 
	page?: number, 
	sk?: string,
    pr_min?: number,
    odo_min?: number,
    year_min?: number,
    pr_max?: number,
    odo_max?: number,
    year_max?: number,
    fuel_types?: string
}

export default function Results({ searchParams }: { searchParams: SearchParamsAttributes }) {
	return (
		<main className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-800 dark:text-white">
			<HeaderBar/>

			<Suspense key={JSON.stringify(searchParams)} fallback={<PageSkeleton/>}>
				<Page searchParams={searchParams} />
			</Suspense>
		</main>
	)
		
}

async function Page({ searchParams }: { searchParams: SearchParamsAttributes }) {
	const urlSearchParams = new URLSearchParams();
	if (searchParams.pr_min) urlSearchParams.set('price_min', (searchParams.pr_min * 1000).toString());
	if (searchParams.pr_max) urlSearchParams.set('price_max', (searchParams.pr_max * 1000).toString());
	if (searchParams.odo_min) urlSearchParams.set('odo_min', (searchParams.odo_min * 1000).toString());
	if (searchParams.odo_max) urlSearchParams.set('odo_max', (searchParams.odo_max * 1000).toString());
	if (searchParams.year_min) urlSearchParams.set('year_min', searchParams.year_min.toString());
	if (searchParams.year_max) urlSearchParams.set('year_max', searchParams.year_max.toString());
	if (searchParams.fuel_types) urlSearchParams.set('fuel_types', searchParams.fuel_types);
	if (searchParams.sk) urlSearchParams.set('sk', searchParams.sk);
	const [result_resp, user_resp] = await Promise.all([backendFetch(`vehicles?${urlSearchParams}`), backendFetch('/user')]) ;
	if (!result_resp.ok) throw new Error('Backend Fetch Error');

	const result = result_resp.data as SearchResult<Vehicle>
    const authenticated = user_resp.ok;

	return <SearchView result={result} authenticated={authenticated}/>
}

function PageSkeleton() {
	return (
		<div className="flex flex-col flex-1">
			<div className='flex flex-1 flex-col sm:flex-row items-stretch py-6 px-4 gap-6'>
				<div className={`hidden sm:flex flex-col flex-none sm:h-[77vh] sm:top-20 sm:items-center sm:sticky`}>
					<FilterBoxSkeleton className='flex-none'/>
				</div>
					
				<div className='flex flex-1 justify-between flex-col gap-4'>
					<div className="flex flex-col flex-1 bg-white dark:bg-white/5 overflow-clip rounded-xl">
						<div className="flex justify-between items-center h-16 px-5 py-3 border-b-2 dark:border-neutral-700">
							<div className="dark:text-white text-xl animate-pulse">Searching...</div>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 overflow-auto items-start gap-4 p-8'>
							<VehicleCardSkeleton />
							<VehicleCardSkeleton />
							<VehicleCardSkeleton />
							<VehicleCardSkeleton />
							<VehicleCardSkeleton />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}