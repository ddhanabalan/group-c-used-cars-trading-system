import { ComponentAttributes } from "@/components/atrributes"

export function FilterBoxSkeleton({hidden, className}: ComponentAttributes) {
    if (hidden) return <div hidden />

    return (
        <div className={`flex flex-col h-max w-min rounded-xl p-4 gap-2 dark:bg-white/5 bg-white ${className}`}>
            <div className='self-center mb-1'>Filters</div>
            <div className='flex flex-col flex-none h-max min-w-64 min-h-32 gap-2'>
                <div className='flex flex-col h-min gap-2'>
                    <div className='dark:bg-white/10 bg-neutral-200 min-h-16 min-w-64 rounded animate-pulse' />
                    <div className='dark:bg-white/10 bg-neutral-200 min-h-16 min-w-64 rounded animate-pulse' />
                    <div className='dark:bg-white/10 bg-neutral-200 min-h-16 min-w-64 rounded animate-pulse' />
                </div>
                <div className='dark:bg-white/10 bg-neutral-200 min-h-28 min-w-64 rounded animate-pulse' />
            </div>
        </div>
    )
}