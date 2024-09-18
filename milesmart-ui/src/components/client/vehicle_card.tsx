'use client'

import Image from "next/image"
import { ComponentAttributes, Vehicle } from "../atrributes"
import { useRouter } from "next/navigation"
import { Badge } from "../server/badge"
import { ShareIcon } from "../icons/share"
import { FavoriteButton } from "./favourites_button"
import { ShareButton } from "./share_button"

type VehicleCardAttributes = ComponentAttributes & { 
    vehicle: Vehicle,
    authenticated?: boolean 
}

export function VehicleCard( { vehicle, className, authenticated }: VehicleCardAttributes) {
    const router = useRouter()

    return (
        <div className={'w-min-64 overflow-clip shadow-md border dark:border-white/5 rounded-lg flex flex-col bg-white dark:bg-white/5 '+className}  onClick={() => { router.push(`/product/${vehicle["_id"]}`) }}>
            <Image alt="main_image" width={-1} height={-1} src={vehicle['image_urls'][0]} className="w-full h-48 overflow-clip object-cover bg-black/10 dark:bg-white/10"/>
            <div className='flex dark:text-white min-h-24 px-3 py-2 gap-2 flex-1'>
                <div className='flex flex-col flex-1 justify-between'>
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
                    <ShareButton id={vehicle._id}/>
                    
                    <FavoriteButton hidden={!authenticated} vehicle={vehicle} />
                </div>
            </div>
        </div>
    )
}