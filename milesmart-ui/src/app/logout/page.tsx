'use client'

import { useEffect } from "react"
import { logout } from "../actions"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
    const router = useRouter()
    useEffect(() => {
        logout().then(() => router.replace('/'))
    }, [router])

    return (
        <main className="flex flex-col items-center justify-center xl:h-dvh min-h-dvh bg-neutral-100 dark:bg-neutral-900">
            <div className="dark:text-white text-3xl animate-pulse">Logging you out... Please wait</div>
        </main>
    )
}