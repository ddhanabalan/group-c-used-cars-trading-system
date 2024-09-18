import { ComponentAttributes } from "../atrributes"
import { EmptyImageIcon } from "../icons/empty_image"

export type ImageGallarySkeletonAttributes = ComponentAttributes & { linearFooter?: boolean }

export function ImageGallarySkeleton({className, linearFooter}: ImageGallarySkeletonAttributes) {
    return (
        <div className={`flex flex-col gap-3 animate-pulse ${className}`}>
            <div className="flex items-center justify-center rounded-lg overflow-clip aspect-video min-h-44 dark:bg-neutral-800 bg-white">
                <EmptyImageIcon className="w-2/4 max-w-72 h-2/4 max-h-72 p-8 fill-neutral-700"/>
            </div>  
            <div className="flex overflow-auto px-1">
                <div className={`flex py-2 gap-3 mx-auto ${linearFooter? 'flex-none': 'flex-wrap justify-center'}`}>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                    <div className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 dark:bg-neutral-800 bg-white`}/>
                </div>
            </div>
        </div>
    )
}