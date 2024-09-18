'use client'

import Image from "next/image"
import { ComponentAttributes, Vehicle } from "../atrributes"
import { useRouter } from "next/navigation"
import { Badge } from "../server/badge"
import { EditIcon } from "../icons/edit"
import { ShareIcon } from "../icons/share"
import { TrashIcon } from "../icons/trash"

type VehicleListItemAttributes = ComponentAttributes & { 
    vehicle: Vehicle,
    shareButtonHidden?: boolean,
    onDelete?: () => void
    onEdit?: () => void
}

export function VehicleListItem( { vehicle, className, shareButtonHidden, onDelete, onEdit}: VehicleListItemAttributes) {
    const router = useRouter()
    const buttonRackNotFull = shareButtonHidden || onDelete == undefined || onEdit == undefined;
    const buttonIconSize = buttonRackNotFull? '5': '4'
    const buttonPadding = `p-${buttonRackNotFull? '2': '1.5'}`

    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Share Vehicle!',
              text: 'Share the vehicle to your friends',
              url: `http://localhost:3000/product/${vehicle._id}`,
            });
          //   console.log('Content shared successfully');
          } catch (error) {
          //   console.error('Error sharing content:', error);
          }
        } else {
          alert('Web Share API not supported in this browser');
        }
      };

    return (
        <div className={'flex min-w-72 overflow-clip border dark:text-white dark:border-white/5 rounded-lg bg-white dark:bg-white/5 '+className}  onClick={() => { router.push(`/product/${vehicle["_id"]}`) }}>
            <Image alt="main_image" width={-1} height={-1} src={vehicle['image_urls'][0]} className="w-28 aspect-square overflow-clip object-cover bg-black/10 dark:bg-white/10"/>
            <div className='flex min-h-24 px-3 py-2 gap-2 flex-1'>
                <div className='flex flex-col flex-1'>
                    <div className='font-bold text-lg'>
                        {vehicle['manufacturer']} {vehicle['model']}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                        <Badge className='text-xs' text={vehicle['odometer']+" KM"} />
                        <Badge className='text-xs' text={vehicle['fuel']} />
                        <Badge className='text-xs' text={vehicle['transmission']} />
                        <Badge className='text-xs' text={vehicle['year'].toString()} />
                    </div>
                    <div className="flex-1"/>
                    <div className="mt-3 text-md font-semibold">
                        {/* &#8377; {vehicle['price']}/- */}
                        $ {vehicle['price']}
                    </div>
                </div>
                <div className="flex gap-2 ml-2 flex-col justify-center">
                    <button hidden={shareButtonHidden} className={`
                    ${buttonPadding} duration-150 rounded-md
                    fill-black dark:fill-white 
                    hover:bg-black/10 active:bg-black/20 
                    dark:hover:bg-white/10 dark:active:bg-white/20
                    disabled:opacity-50 disabled:hover:bg-transparent`} 
                    onClick={(e) => {
                        e.stopPropagation(),
                        handleShare();
                    }}>
                        <ShareIcon className={`h-${buttonIconSize} w-${buttonIconSize}`}/>
                    </button>

                    <button hidden={onEdit == undefined} className={`
                    ${buttonPadding} duration-150 rounded-md
                    fill-black dark:fill-white 
                    hover:bg-black/10 active:bg-black/20 
                    dark:hover:bg-white/10 dark:active:bg-white/20 disabled:opacity-50 
                    disabled:hover:bg-transparent`} 
                    disabled={true}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (onEdit) onEdit()
                    }}>
                        <EditIcon className={`h-${buttonIconSize} w-${buttonIconSize}`}/>
                    </button>

                    <button hidden={onDelete == undefined} className={`
                    ${buttonPadding} duration-150 rounded-md
                    fill-black dark:fill-white 
                    hover:bg-black/10 active:bg-black/20 
                    dark:hover:bg-white/10 dark:active:bg-white/20`} 
                    onClick={(e) => {
                        e.stopPropagation()
                        if (onDelete) onDelete()
                    }}>
                        <TrashIcon className={`h-${buttonIconSize} w-${buttonIconSize}`}/>
                    </button>
                </div>
            </div>
        </div>
    )
}