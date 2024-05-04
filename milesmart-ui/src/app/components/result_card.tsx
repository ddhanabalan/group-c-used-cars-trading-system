'use client'

import Badge from "./badge"
import Card from "./card"
import Image from "next/image"
import ShareIcon from "./icons/share_icon"
import FavoriteIcon from "./icons/favorite_icon"
import { useRouter } from "next/navigation"

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
    },
    className?: string
}) {
    const router = useRouter()

    return (
        <Card className={'w-min-64 min-h-72 overflow-clip '+className}>
            <div className='flex flex-col flex-1' onClick={() => { router.push(`/product?vid=${vehicle["_id"]}`) }}>
                <div className='h-max bg-white'>
                <Image alt="main_image" width={-1} height={-1} src={vehicle['image_urls'][0]} className="w-full h-48 overflow-clip object-cover hover:outline-2 hover:outline-black"/>
                </div>
                <div className='flex dark:text-white min-h-24 px-3 py-2 gap-2 flex-none'>
                    <div className='flex flex-col flex-1'>
                        <div className='font-bold text-lg'>
                            {vehicle['year']} {vehicle['manufacturer']} {vehicle['model']}
                        </div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                            <Badge className='text-xs' text={vehicle['odometer']+" KM"} />
                            <Badge className='text-xs' text={vehicle['fuel']} />
                            <Badge className='text-xs' text={vehicle['transmission']} />
                        </div>
                        <div className="mt-3 text-md font-semibold">
                            &#8377; {vehicle['price']}/-
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <button className="
                        px-2 py-2 duration-150 rounded-md
                        fill-black dark:fill-white 
                        hover:bg-gray-300 dark:hover:bg-gray-800 
                        active:bg-gray-400 dark:active:bg-gray-700" 
                        //   onClick={ () => 
                        //     make_notification('Feature Unavailable', 'The Share feature is under development. Hope the next demo will include that')
                        //   }
                        >
                            <ShareIcon className="h-5 w-5"/>
                        </button>
                        
                        <button className="
                        px-2 py-2 duration-150 rounded-md h-min
                        fill-black dark:fill-white 
                        hover:bg-gray-300 dark:hover:bg-gray-800 
                        active:bg-gray-400 dark:active:bg-gray-700"
                        //   onClick={ () => 
                        //     make_notification('Feature Unavailable', 'The Report feature is under development. Hope the next demo will include that')
                        //   }
                        >
                            <FavoriteIcon className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    )
}