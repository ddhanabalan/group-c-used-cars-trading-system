import { Suspense } from "react";
import { backendFetch } from "../actions";
import { ComponentAttributes, PageAttributes, User, Vehicle, Wishlist } from "../../components/atrributes";
import { HeaderBar } from "../../components/server/header_bar";
import { Pagination } from "../../components/client/pagination";
import { ProfileCard } from "./components/profile_card";
import { Selector } from "../../components/client/selector";
import { AddCarButton } from "./components/add_car_button";
import { ProfileCardSkeleton } from "@/components/skeletons/profile_card";
import { VehicleListItemSkeleton } from "@/components/skeletons/vehicle_list_item";
import { MyCarsListView, MyFavoritesListView } from "./components/listview";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function SectionSkeletons({hidden, title}: ComponentAttributes & { title: string }) {
    return (
        <div className={`flex-1 flex-col gap-4 ${hidden? 'hidden xl:flex': 'flex'}`}>
            <div className="flex-1 flex-col bg-white dark:bg-white/10 rounded-xl">
                <div className="xl:flex hidden justify-between items-center h-16 px-5 py-3 border-b-2 dark:border-neutral-700">
                    <div className="dark:text-white text-xl">{title}</div>
                </div>
                <div className="flex flex-col p-2 gap-2">
                    <VehicleListItemSkeleton />
                    <VehicleListItemSkeleton />
                    <VehicleListItemSkeleton />
                </div>
            </div>
        </div>
    )
}

async function MyCarsSection({page = 0}: ComponentAttributes & { page?: number }) {
    const vehicles_resp = await backendFetch(`user/vehicles?filter_bounds=false&page=${page}`)
    if (!vehicles_resp.ok) throw Error('Fetch Error')
    const query_response_object = vehicles_resp.data;
    const vehicles: Vehicle[] = query_response_object['results']
    
    return (
        <div className={`flex flex-1 flex-col gap-4`}>
            <div className="flex-1 flex-col bg-white dark:bg-white/10 rounded-xl overflow-clip">
                <div className="xl:flex hidden justify-between items-center h-16 px-5 py-3 border-b-2 dark:border-neutral-700">
                    <div className="dark:text-white text-xl">My Cars</div>
                    <AddCarButton/>
                </div>
                <MyCarsListView vehicles={vehicles}/>
            </div>
            <Pagination parameterName="my_cars_page" maxPages={query_response_object['pages']}/>
        </div>
    )
}

async function MyFavouritesSection({page = 0}: ComponentAttributes & { page?: number }) {
    const wishlists_resp = await backendFetch(`user/wishlist?page=${page}`)
    if (!wishlists_resp.ok) throw Error('Fetch Error')
    const query_response_object = wishlists_resp.data;
    const wishlists: Wishlist[] = query_response_object['results']

    return (
        <div className={`flex flex-1 flex-col gap-4`}>
            <div className="flex-1 flex-col bg-white dark:bg-white/10 rounded-xl">
                <div className="xl:flex hidden justify-between items-center px-5 py-3 h-16 border-b-2 dark:border-neutral-700">
                    <div className="dark:text-white text-xl">My Favorites</div>
                </div>
                <MyFavoritesListView wishlists={wishlists}/>
            </div>
            <Pagination parameterName="favourites_page" maxPages={query_response_object['pages']}/>
        </div>
    )
}

function ListingSection({selection = 0, favouritesPage = 0, myCarsPage = 0}: {selection?: number, favouritesPage?: number, myCarsPage?: number}) {
    return (
        <div className="flex flex-1 xl:flex-row flex-col gap-2 xl:gap-4">
            <div className={`flex items-center xl:hidden justify-between rounded-xl ${selection == 1? 'self-center': ''}`}>
                <Selector options={['My Cars', 'My Favorites']} className="bg-black/10 shadow" parameterName="selection" />
                <AddCarButton hidden={selection == 1} />
            </div>
            <div className={`${selection != 0? 'hidden xl:flex': 'flex'} flex-1 flex-col`}>
                <Suspense key={`cars: ${myCarsPage}`} fallback={<SectionSkeletons title="My Cars" />}>
                    <MyCarsSection hidden={selection != 0} page={myCarsPage}/>
                </Suspense>
            </div>
            <div className={`${selection != 1? 'hidden xl:flex': 'flex'} flex-1 flex-col`}>
                <Suspense key={`fav: ${favouritesPage}`} fallback={<SectionSkeletons title="My Favorites" />}>
                    <MyFavouritesSection hidden={selection != 1} page={favouritesPage}/>
                </Suspense>
            </div>
            
        </div>
    )
}

async function ProfileCardSection({}:{}) {
    const user_resp = await backendFetch('user')
    if (!user_resp.ok && user_resp.status != 401) throw new Error('Backend offline')
    const authenticated = user_resp.ok;
    const user: User = authenticated? user_resp.data: undefined;

    return <ProfileCard user={user} className="md:self-start" />
}

export default function ProfilePage({searchParams}: { searchParams?: { selection?: number, my_cars_page?: number, favorites_page?: number } }) {
    if (!cookies().has('token')) redirect('/')
    return (
        <main className="flex flex-col xl:h-dvh min-h-dvh bg-neutral-100 dark:bg-neutral-900">
            <HeaderBar />
            <div className="flex flex-1 flex-col md:flex-row p-4 gap-4">
                <Suspense fallback={<ProfileCardSkeleton className="md:self-start"/>}>
                    <ProfileCardSection />
                </Suspense>
                <ListingSection selection={searchParams?.selection} favouritesPage={searchParams?.favorites_page} myCarsPage={searchParams?.my_cars_page}/>
            </div>
        </main>
    )
}