'use client'

import { ComponentAttributes } from "@/components/atrributes";
import { CloseIcon } from "@/components/icons/close";
import { useState } from "react";

export function PriceDialog({hidden, prediction, onCancelled = () => {}, onContinue = () => {}}: ComponentAttributes & { onCancelled?: () => void, onContinue?: (price: number) => void, prediction?: number }) {
    const [price, set_price] = useState("");            
    function closeDialog(e:any) {
        e.stopPropagation();
        onCancelled();
    }

    if (hidden) return <div hidden />
    
    return (
        <div className="fixed bg-black/50 h-screen w-screen z-20 top-0 flex flex-col items-center justify-center" onClick={(e) => closeDialog(e)}>
            <div className="flex h-min w-96 bg-neutral-900 rounded-lg overflow-clip relative" onClick={(e) => e.stopPropagation()}>
                <div className="bg-black dark:bg-[#282828] w-20 h-auto"></div>
                <div className="flex flex-col flex-1 h-min px-4 pb-4">
                    <div className="text-xl dark:text-white font-semibold w-auto text-center p-2 mt-3">Set your Price</div>
                    <div className="text-gray-600 dark:text-white text-base ml-1 mt-4 mb-1">Your Price</div>
                    <input className="bg-gray-100 dark:bg-[#282828] placeholder:text-gray-400 rounded px-2 py-1 outline-none" 
                    // placeholder={obj['price']} 
                        value={price}
                        onChange={(e) => set_price(e.target.value)} 
                    />
                    <div hidden={prediction == undefined} className="text-sm text-green-600 bg-green-100 dark:text-green-200 dark:bg-green-800 w-min text-nowrap py-1 px-4 mt-2 self-end rounded-full">
                        AI Suggested Fair Price $ {prediction}
                    </div>
                    {/* <DialogClose asChild> */}
                        <button className="
                        px-4 py-1.5 mt-8 duration-150 rounded-md h-min w-full
                        text-white 
                        bg-black dark:bg-[#282828]
                        hover:bg-gray-800 dark:hover:bg-white/25
                        active:bg-gray-700 dark:active:bg-white/30" 
                        onClick={(e) => {
                            closeDialog(e);
                            onContinue(Number(price));
                        }}>
                        Continue
                        </button>
                    {/* </DialogClose> */}
                </div>
                <button
                className="text-black hover:bg-neutral-200 active:bg-neutral-300 dark:text-white dark:hover:bg-neutral-700 dark:active:bg-neutral-600 rounded-full px-1.5 py-1.5 focus:outline-none absolute top-3 right-3"
                aria-label="Close"
                onClick={(e) => closeDialog(e)}>
                    <CloseIcon  className="h-4 md:h-5 w-4 md:w-5 self-center fill-black dark:fill-white"/>
                </button>
            </div>
        </div>
    )
}