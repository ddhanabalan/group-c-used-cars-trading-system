'use client'

import { ComponentAttributes } from "@/components/atrributes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function BuyNowButton({hidden}:ComponentAttributes){
    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    return (
        <button hidden={hidden} onClick={() => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('owner_dg', 'true');
            router.push(`${path}?${newSearchParams}`)
        }}  className="
                  px-4 py-1 duration-150 rounded-md h-min w-full
                  text-white 
                  bg-black dark:bg-white/20
                  hover:bg-gray-800 dark:hover:bg-white/25
                  active:bg-gray-700 dark:active:bg-white/30">Buy Now</button>
    )
}