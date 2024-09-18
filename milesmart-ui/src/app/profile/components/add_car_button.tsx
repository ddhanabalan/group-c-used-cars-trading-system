'use client'

import { ComponentAttributes } from "@/components/atrributes"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { MouseEvent } from 'react'

export function AddNewIcon({className}: ComponentAttributes) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    )
}

export function AddCarButton({hidden, className}: ComponentAttributes) {
    const router = useRouter()

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        router.push('sell');
    }

    return (
        <button className={`
        ${hidden? 'hidden': 'flex'} items-center gap-1 pl-2 pr-4 py-1.5 duration-150 rounded-md
        text-white fill-white 
        bg-black dark:bg-white/20
        hover:bg-gray-800 dark:hover:bg-white/25
        active:bg-gray-700 dark:active:bg-white/30 ${className}`} 
        onClick={handleClick}>
            <AddNewIcon className="h-5 w-5" />
            <div className="">Add Car</div>
        </button>
    )
}