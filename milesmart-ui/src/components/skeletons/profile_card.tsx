import { ComponentAttributes } from "../atrributes";

export function ProfileCardSkeleton({ className }: ComponentAttributes) {
    return (
        <div className={`flex animate-pulse md:flex-col flex-row min-w-96 md:min-w-64 min-h-32 md:min-h-96 py-3 pl-4 pr-3 sm:pr-8 md:px-3 gap-4 rounded-xl dark:bg-white/10 bg-white dark:text-white relative ${className}`}>
            <div className="w-28 h-28 md:my-4 self-center rounded-full dark:bg-white/10 bg-black/10"/>
            <div className="flex flex-col gap-1 flex-1 md:items-center">
                <div className="w-44 h-7 bg-black/10 dark:bg-white/10 rounded-lg"/>
                <div className="w-16 h-4 bg-black/10 dark:bg-white/10 rounded"/>
                <div className="flex mt-2 flex-wrap md:flex-col md:bg-black/5 md:dark:bg-white/5 md:self-stretch md:px-4 md:py-3 md:my-3 rounded-lg gap-2">
                    <div className="w-28 h-6 bg-black/10 dark:bg-white/10 md:bg-transparent dark:md:bg-transparent rounded-full"/>
                    <div className="w-48 h-6 bg-black/10 dark:bg-white/10 md:bg-transparent dark:md:bg-transparent rounded-full"/>
                </div>
                <div className="md:flex-1"/>
                <div className="flex flex-none md:mt-2 mt-4 gap-2">
                    <div className="w-32 h-8 bg-black/10 dark:bg-white/10 rounded-md"/>
                    <div className="w-32 h-8 bg-black/10 dark:bg-white/10 rounded-md"/>
                </div>
            </div>
        </div>
    )
}