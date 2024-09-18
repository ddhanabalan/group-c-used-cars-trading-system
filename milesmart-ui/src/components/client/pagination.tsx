'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ComponentAttributes } from "../atrributes"
import { NextIcon } from "../icons/next"
import { useEffect } from "react"

type PaginationAttributes = ComponentAttributes & {
    maxPages?: number,
    parameterName?: string
}

export function Pagination({ className, maxPages = 0, parameterName = 'page', hidden }: PaginationAttributes) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const path = usePathname()
    const page = Number.parseInt(searchParams.get(parameterName) ?? '0')
    hidden = maxPages <= 1

    function go_next() {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(parameterName, (page+1).toString())
        router.replace(`${path}?${newSearchParams}`)
    }

    function go_back() {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(parameterName, (page-1).toString())
        router.replace(`${path}?${newSearchParams}`)
    }

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(parameterName, (page+1).toString())
        router.prefetch(`${path}?${newSearchParams}`)
    })

    return (
        <div className={`${hidden? 'hidden': 'flex'} justify-between p-1 rounded-lg items-center bg-white dark:bg-white/10 dark:text-white ${className}`}>
            <button disabled={page == 0} className="p-2 hover:bg-black/10 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20 rounded-md fill-black dark:fill-white disabled:fill-neutral-400 disabled:dark:fill-neutral-600 disabled:bg-transparent disabled:dark:bg-transparent" onClick={go_back}><NextIcon className="h-5 w-5 rotate-180"/></button>
            <div>Page {page+1} {maxPages ? '/'+maxPages: ''}</div>
            <button disabled={maxPages? page+1 >= maxPages: false} className="p-2 hover:bg-black/10 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20 rounded-md fill-black dark:fill-white disabled:fill-neutral-400 disabled:dark:fill-neutral-600 disabled:bg-transparent disabled:dark:bg-transparent" onClick={go_next}><NextIcon className="h-5 w-5"/></button>
        </div>
    )
}