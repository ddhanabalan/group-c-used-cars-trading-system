'use client'

import { ComponentAttributes } from "../atrributes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SelectorAttributes = ComponentAttributes & {
    parameterName: string,
    options: string[],
    defaultOption?: number
}

export function Selector({parameterName, options, defaultOption = 0, className}: SelectorAttributes) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const path = usePathname()
    const selection  = Number.parseInt(searchParams.get(parameterName) ?? defaultOption.toString())

    function select(value: string) {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(parameterName, options.indexOf(value).toString())
        router.replace(`${path}?${newSearchParams}`)
    }

    return (
        <div className={`flex bg-white dark:bg-white/10 p-1 rounded-xl gap-1 ${className}`}>
            {options.map((value, index) => {
                return (
                    <button key={index} onClick={() => select(value)} className={`px-3 py-1 rounded-lg ${value == options[selection]? 'dark:bg-white/20 bg-neutral-900 text-white': 'dark:hover:bg-white/15 dark:active:bg-white/20 hover:bg-neutral-100 active:bg-neutral-900 text-black active:text-white dark:text-white'}`}>{value}</button>
                )
            })}
        </div>
    )
}