'use client'

import { ComponentAttributes } from "@/components/atrributes";
import { Cross2Icon } from "@radix-ui/react-icons";

export function LoadDialog({hidden, onCancelled = () => {}}: ComponentAttributes & { onCancelled?: () => void }) {

    function closeDialog(e:any) {
        e.stopPropagation();
        onCancelled();
    }

    if (hidden) return <div hidden />
    
    return (
        <div className="fixed bg-black/50 h-screen w-screen z-20 top-0 flex flex-col items-center justify-center" onClick={(e) => closeDialog(e)}>
            <div>Please Wait...</div>
        </div>
    )
}