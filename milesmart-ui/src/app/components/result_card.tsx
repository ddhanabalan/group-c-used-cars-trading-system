'use client'

import Badge from "./badge"
import Card from "./card"
import Image from "next/image"
import ShareIcon from "./icons/share_icon"
import FavoriteIcon from "./icons/favorite_icon"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ResultCard( { vehicle, className }: {
    vehicle: { 
        _id: number, 
        fuel: string, 
        image_urls: string[],
        manufacturer: string,
        model: string,
        odometer: number,
        price: number,
        state: string,
        transmission: string,
        year: number 
        wishlist_id?: {
            _id: string
        }
    },
    className?: string
}) {
    const router = useRouter()
    const [wishlist_id, set_wishlist_id] = useState<string|undefined>()
    const [token, set_token] = useState<string|undefined>()

    useEffect(() => {
        const access_token = localStorage.getItem("token")
        if (access_token) set_token(access_token)

        set_wishlist_id(vehicle.wishlist_id?._id)
        // console.log(vehicle)
    })

    return (
        // <Card className={'w-min-64 min-h-72 overflow-clip '}>
        <div className={'w-min-64 min-h-72 overflow-clip shadow-md border dark:border-gray-800 rounded-lg flex flex-col bg-white dark:bg-[#282828] '+className}>
            <div className='h-max bg-white' onClick={() => { router.push(`/product?vid=${vehicle["_id"]}`) }}>
                <Image alt="main_image" width={-1} height={-1} src={vehicle['image_urls'][0]} className="w-full h-48 overflow-clip object-cover hover:outline-2 hover:outline-black"/>
            </div>
            <div className='flex dark:text-white min-h-24 px-3 py-2 gap-2 flex-1'>
                <div className='flex flex-col flex-1 justify-between' onClick={() => { router.push(`/product?vid=${vehicle["_id"]}`) }}>
                    <div className='font-bold text-lg'>
                        {vehicle['manufacturer']} {vehicle['model']}
                    </div>
                    <div className="flex gap-1 mt-1 flex-wrap">
                        <Badge className='text-xs' text={vehicle['odometer']+" KM"} />
                        <Badge className='text-xs' text={vehicle['fuel']} />
                        <Badge className='text-xs' text={vehicle['transmission']} />
                        <Badge className='text-xs' text={vehicle['year'].toString()} />
                    </div>
                    <div className="mt-3 text-md font-semibold">
                        {/* &#8377; {vehicle['price']}/- */}
                        $ {vehicle['price']}
                    </div>
                </div>
                <div className="flex gap-2 flex-col">
                    <button className="
                    px-2 py-2 duration-150 rounded-md
                    fill-black dark:fill-white 
                    hover:bg-gray-300 dark:hover:bg-gray-800 
                    active:bg-gray-400 dark:active:bg-gray-700" 
                    onClick={() => {

                    }}>
                        <ShareIcon className="h-5 w-5"/>
                    </button>
                    
                    <button hidden={token == undefined} className="
                    px-2 py-2 duration-150 rounded-md h-min
                    fill-black dark:fill-white 
                    hover:bg-gray-300 dark:hover:bg-gray-800 
                    active:bg-gray-400 dark:active:bg-gray-700"
                    onClick={() => {
                        if (wishlist_id == undefined) fetch('backend/user/wishlist', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                'vehicle': vehicle._id
                            })
                        }).then((resp) => resp.json()).then((obj) => {
                            if ('error' in obj) console.error(`[Error] ${obj['error']}: ${obj['message']}`)
                            else set_wishlist_id((vehicle['wishlist_id'] = obj)['_id'])
                        })
                        
                        else fetch(`backend/user/wishlist/${wishlist_id}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` }
                        }).then((resp) => {
                            if (resp.ok) set_wishlist_id(vehicle['wishlist_id'] = undefined)
                        })
                    }}>
                        <FavoriteIcon toggled={wishlist_id != undefined} className="h-5 w-5"/>
                    </button>
                </div>
            </div>
        </div>
        // </Card>
    )
}