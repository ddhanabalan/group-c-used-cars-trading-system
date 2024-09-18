import { ComponentAttributes } from "../atrributes";

export function VehicleCardSkeleton( { className }: ComponentAttributes) {
    return (
        <div className={'w-min-64 animate-pulse overflow-clip shadow-md border dark:border-white/5 rounded-lg flex flex-col bg-white dark:bg-white/5 '+className}>
            <div className="w-full h-48 overflow-clip object-cover bg-black/10 dark:bg-white/10"/>
            <div className='flex dark:text-white min-h-24 px-3 py-2 gap-2 flex-1'>
                <div className='flex flex-col flex-1 justify-between'>
                    <div className='font-bold text-lg'>
                        <div className="w-36 h-6 rounded-md bg-black/10 dark:bg-white/10"/>
                    </div>
                    <div className="flex gap-1 mt-1 flex-wrap">
                        <div className="w-20 h-5 rounded bg-black/10 dark:bg-white/10"/>
                        <div className="w-12 h-5 rounded bg-black/10 dark:bg-white/10"/>
                        <div className="w-16 h-5 rounded bg-black/10 dark:bg-white/10"/>
                        <div className="w-12 h-5 rounded bg-black/10 dark:bg-white/10"/>
                    </div>
                    <div className="mt-3 text-md font-semibold">
                        {/* &#8377; {vehicle['price']}/- */}
                        <div className="w-24 h-6 rounded-md bg-black/10 dark:bg-white/10"/>
                    </div>
                </div>
                <div className="ml-2 w-9 gap-2 flex-col">
                </div>
            </div>
        </div>
    )
}