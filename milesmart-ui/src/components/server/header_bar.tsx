import Image from "next/image"
import Link from "next/link"
import { SearchBar } from "./header_bar/search_bar"
import { ComponentAttributes, User } from "../atrributes"
import { LoginButton, ProfileButton, SellButton, WishlistButton } from "./header_bar/end_buttons"
import { Suspense } from "react"
import { backendFetch } from "@/app/actions"
import ThemeSwitcher from "../client/theme_switcher"

type HeaderBarAttributes = ComponentAttributes & {
    wishlistButtonHidden?: boolean,
    sellButtonHidden?: boolean,
    searchBarHidden?: boolean
}

type EndButtonsAttributes = ComponentAttributes & {
    wishlistButtonHidden?: boolean,
    sellButtonHidden?: boolean
}

async function EndButtons({ className, wishlistButtonHidden, sellButtonHidden }: EndButtonsAttributes) {
    const user_resp = await backendFetch('/user')
    if (!user_resp.ok && user_resp.status != 401) throw new Error('Backend offline')
    const authenticated = user_resp.ok;
    const user: User = authenticated? user_resp.data: undefined;
    
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <ThemeSwitcher />

            <SellButton hidden={wishlistButtonHidden} authenticated={authenticated} />

            <WishlistButton hidden={sellButtonHidden || !authenticated} authenticated={authenticated} />

            <LoginButton hidden={authenticated} />

            <ProfileButton hidden={!authenticated} picture={user?.picture}/>
        </div>
    )
}

export function HeaderBar( { className, searchBarHidden, wishlistButtonHidden, sellButtonHidden }: HeaderBarAttributes) {
    return (
        <div className={`flex flex-none flex-col h-14 px-4 sticky top-0 backdrop-blur-md z-10 bg-white/90 shadow-md dark:bg-neutral-700/90 ${className}`}>
            <div className="flex items-center gap-3 h-full">
                <Link href={"/"}>
                    <div className="pr-2 py-1 text-lg font-bold dark:text-white">
                        milesmart
                    </div>
                </Link>

                <div hidden={ searchBarHidden } className="grow flex justify-center">
                    <SearchBar className="dark:text-white"/>
                </div>

                <Suspense>
                    <EndButtons sellButtonHidden={sellButtonHidden} wishlistButtonHidden={wishlistButtonHidden} />
                </Suspense>
            </div>
        </div>
    )
}