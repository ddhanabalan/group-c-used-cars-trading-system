'use client'

import Image from "next/image"
import { MouseEvent } from "react";
import { ComponentAttributes } from "../../atrributes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WishlistIcon } from "../../icons/wishlist";
import { login } from "@/app/actions";
import Link from "next/link";
import { SellCarIcon } from "@/components/icons/sell_car";

type SellButtonAttributes = ComponentAttributes & {
    destinationRoute?: string,
    authenticated?: boolean
}

type WishlistButtonAttributes = ComponentAttributes & {
    destinationRoute?: string
    authenticated?: boolean
}

type LoginButtonAttributes = ComponentAttributes

type ProfileButtonAttributes = ComponentAttributes & {
    picture?: string,
    destinationRoute?: string
}

export function SellButton({hidden, className, authenticated, destinationRoute = '/sell'}: SellButtonAttributes) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        if (authenticated) router.push(destinationRoute);
        else login(`${pathname}?${searchParams.toString()}`);
    }

    return (
        <button hidden={ hidden } className={`
        sm:px-4 sm:py-1.5 p-2 duration-150 rounded-md text-nowrap
        text-white
        fill-black dark:fill-white 
        hover:bg-black/10 active:bg-black/20 
        dark:hover:bg-white/10 dark:active:bg-white/20
        sm:bg-black sm:dark:bg-white/20
        sm:hover:bg-black/80 sm:dark:hover:bg-white/10
        sm:active:bg-black/70 sm:dark:active:bg-white/20 ${className}`} 
        onClick={handleClick}><div className="hidden sm:contents">Sell Car</div><SellCarIcon className="h-5 w-5 sm:hidden"/></button>
    )
}

export function WishlistButton({hidden, className, authenticated, destinationRoute = 'profile?selection=1'}: WishlistButtonAttributes) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        if (authenticated) router.push(destinationRoute);
        else login(`${pathname}?${searchParams.toString()}`);
    }
    
    return (
        <button hidden={hidden} className={`
        px-2 py-2 duration-150 rounded-md h-min
        fill-black dark:fill-white 
        hover:bg-black/10 active:bg-black/20 
        dark:hover:bg-white/10 dark:active:bg-white/20 ${className}`}
        onClick={handleClick}>
            <WishlistIcon className="h-5 w-5"/>
        </button>
    )
}

export function LoginButton({hidden, className}: LoginButtonAttributes) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        login(`${pathname}?${searchParams.toString()}`)
    }
    
    return (
        <button hidden={hidden} onClick={handleClick} className={`
            px-4 py-1.5 duration-150 rounded-md
            text-white  
            bg-black dark:bg-white/20
            hover:bg-gray-800 dark:hover:bg-white/25
            active:bg-gray-700 dark:active:bg-white/30 ${className}`}>Login</button>
    )
}



export function ProfileButton({hidden, className, picture = "/account.jpg", destinationRoute = '/profile'}: ProfileButtonAttributes) {
    return (
        <Link href={destinationRoute}>
            <Image hidden={hidden} alt="profile_image" width={-1} height={-1} src={picture} referrerPolicy="no-referrer" className={`${className} min-h-9 min-w-9 h-9 w-9 rounded-full sm:mx-2 overflow-clip object-cover hover:outline-2 hover:outline-black`}/>
        </Link>
    )
    
}