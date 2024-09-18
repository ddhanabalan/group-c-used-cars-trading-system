'use client'

import { backendFetch } from "@/app/actions"
import { useState } from "react"
import { ComponentAttributes, Vehicle } from "../atrributes"
import { FavoriteIcon } from "../icons/favorite"

type FavoriteButtonAttributes = ComponentAttributes & { 
    vehicle: Vehicle
}

export function FavoriteButton({vehicle, hidden}: FavoriteButtonAttributes) {
    const [toggled, setToggled] = useState(vehicle.wishlist_id != undefined)
    async function mark() {
        const resp = await backendFetch('user/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'vehicle': vehicle._id })
        })
        if (!resp.ok) throw new Error('Wishlist Marking Failed');
        vehicle.wishlist_id = resp.data
        setToggled(true);
    }
    async function unmark() {
        const resp = await backendFetch(`user/wishlist/${vehicle.wishlist_id?._id}`, { method: 'DELETE' })
        if (!resp.ok) throw new Error('Wishlist UnMarking Failed');
        vehicle.wishlist_id = undefined
        setToggled(false);
    }
    return (
        <button hidden={hidden} className="
            px-2 py-2 duration-150 rounded-md h-min
            fill-black dark:fill-white 
            hover:bg-black/10 active:bg-black/20 
            dark:hover:bg-white/10 dark:active:bg-white/20"
            onClick={(e) => {
                e.stopPropagation()
                if (toggled) unmark()
                else mark()
            }}>
            <FavoriteIcon toggled={toggled} className="h-5 w-5"/>
        </button>
    )
}