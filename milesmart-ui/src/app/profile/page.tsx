"use client"

import { useEffect, useState } from "react";
import BuySellBar from "./components/BuySellBar";
import Buycard from "./components/Buycard";
import SideBar from "./components/SideBar";
import Sellcard from "./components/Sellcard";
import Wishlistcard from "./components/Wishlistcard";
import HeaderBar from "../components/header_bar";
import { useRouter } from "next/navigation";


export default function Home() {
  const [selection, set_selection] = useState(0)
  const [user_info, set_user_info] = useState<any|undefined>()
  const [wishlist, set_wishlist] = useState<any[]|undefined>()
  const [vehicles, set_vehicles] = useState<any[]|undefined>()
  const router = useRouter()

  var widget = selection == 0? (<Sellcard vehicles={vehicles} on_deleted={(index)=> {
    const removed_list = [...(vehicles ?? [])]
    const item = removed_list.splice(index, 1)[0]
    set_vehicles(removed_list)

    const update_and_reload = async (item: any) => {
      await fetch(`backend/user/vehicles/${item['_id']}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })

      const wishlist_resp = await fetch('backend/user/wishlist', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })

      if (wishlist_resp.ok) set_wishlist((await wishlist_resp.json())['results'])
    }

    update_and_reload(item)
  }}/>): <Wishlistcard wishlist={wishlist} on_deleted={(index)=> {
    const removed_list = [...(wishlist ?? [])]
    removed_list.splice(index, 1)
    set_wishlist(removed_list)
  }}/>

  const load_user_profile = async (access_token: string) => {
    const user_info_resp = await fetch('backend/user', { headers: { 'Authorization': `Bearer ${access_token}` } })

    if (user_info_resp.ok) set_user_info(await user_info_resp.json())
    else {
      router.replace('/')
      return
    }

    const vehicles_resp = await fetch('backend/user/vehicles?filter_bounds=false', { headers: { 'Authorization': `Bearer ${access_token}` } })

    if (vehicles_resp.ok) set_vehicles((await vehicles_resp.json())['results'])

    const wishlist_resp = await fetch('backend/user/wishlist', { headers: { 'Authorization': `Bearer ${access_token}` } })

    if (wishlist_resp.ok) set_wishlist((await wishlist_resp.json())['results'])
  }

  useEffect(() => {
    const access_token = localStorage.getItem("token")
    if (access_token == null) {
      router.back()
      return
    }

    load_user_profile(access_token)
  }, [])

  return (
    <main className="flex flex-col min-h-screen bg-[#F5F5F5] dark:bg-[#181818] ">
      <HeaderBar/>
      <div className="flex flex-row gap-2 mx-10 min-h-screen">
        <div className=" mt-16 ">
          <SideBar user_info={user_info}/>
        </div>
        
        <div className="mt-16 mr-8 mb-8 pb-6 bg-white dark:bg-[#282828] w-full rounded-3xl">
          <div hidden={user_info == undefined}>
            <BuySellBar selection={selection} on_selection_changed={(index: number) => {
              set_selection(index)
            }}/>
            {widget}
          </div>
        </div>


      </div>
    </main>
  );
}
