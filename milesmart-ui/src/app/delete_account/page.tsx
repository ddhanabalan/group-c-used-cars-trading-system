'use client'

import { useEffect, useState } from "react"
import { deleteAccount, logout } from "../actions"
import { useRouter } from "next/navigation"

export default function DeleteAccountPage() {
    const [deleteaccount, set_deleteaccount] = useState(false)
    const router = useRouter()
    // useEffect(() => {
    //     logout().then(() => router.replace('/'))
    // }, [router])

    return (
        <main className="flex flex-col items-center justify-center xl:h-dvh min-h-dvh bg-neutral-100 dark:bg-neutral-900">
            {/* confim section */}
            <div className={`${deleteaccount? 'hidden': 'flex'} flex-col w-96 px-6 py-4 gap-4 items-center justify-between rounded-xl dark:bg-white/10 bg-white dark:text-white relative `}>
                <div className=" text-2xl font-bold mt-4">Deleting your Account</div>
                <div className=" px-4">Deleting your account will remove all your data from our database. This cannot be undone.</div>
                <div className="flex self-stretch gap-2">
                    <button onClick={(e) => {e.stopPropagation(); router.replace('logout')}} className="flex-1 text-center text-white px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/30 rounded-md">
                        Cancel
                    </button>
                    <button onClick={() => {
                        set_deleteaccount(true)
                        deleteAccount().then(() => router.replace('/'))
                    }} className="flex-1 text-center px-4 py-1.5 bg-red-500 hover:bg-red-400 text-white active:bg-red-300 rounded-md">
                        Delete
                    </button>
                </div>
        </div>
            {/* deleting section */}
            <div className="dark:text-white text-3xl animate-pulse" hidden={!deleteaccount}>Deleting your Account... Please wait</div>
        </main>
    )
}