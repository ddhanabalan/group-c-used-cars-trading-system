'use client'

import { ComponentAttributes } from "@/components/atrributes";
import { FilterAttributes, FilterBox } from "./filter_box";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterDialog({ranges, hidden, onCancelled = () => {}}: ComponentAttributes & { ranges: FilterAttributes, onCancelled?: () => void }) {
    const searchParams = useSearchParams();
    const dialogVisible = searchParams.has('filter_dialog') ? searchParams.get('filter_dialog') == 'true': false;
    const router = useRouter();

    if (hidden) return <div hidden />
    
    return (
        <div className="sm:hidden fixed bg-black/40 h-screen w-screen z-20 top-0 flex flex-col items-center justify-center" onClick={(e) => {
            e.stopPropagation();
            onCancelled();
        }}>
            <div onClick={(e) => e.stopPropagation()} className="dark:bg-neutral-800 rounded-xl">
                <FilterBox ranges={ranges}/>
            </div>
        </div>
    )
}