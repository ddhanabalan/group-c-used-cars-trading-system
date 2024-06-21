'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function HeaderBar( { 
    className, 
    on_search,
    on_buy_clicked,
    on_sell_clicked,
    on_profile_clicked,
    buy_enabled,
    search_enabled = true,
    sell_enabled = true,
    search,
    on_search_changed,
}: {
    className?: string,
    on_search?: (search: string) => void,
    on_buy_clicked?: () => void,
    on_sell_clicked?: () => void,
    on_profile_clicked?: () => void,
    buy_enabled?: boolean,
    sell_enabled?: boolean,
    search_enabled?: boolean,
    search?: string,
    on_search_changed?: (search: string) => void
}) {
    const router = useRouter()
    const pathname = usePathname()
    const search_params = useSearchParams()
    const [search_key, set_search_key] = useState("")
    const [token, set_token] = useState<string|undefined>()
    const [is_result_page, set_is_result_page] = useState<boolean>(false)
    const [profile_img, set_profile_img] = useState<string>("https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=")

    const load_profile = (token_string: string) => {
        fetch("backend/user", {
            headers: { 'Authorization': `Bearer ${token_string}` },
        }).then((resp) => {
            if (resp.ok) resp.json().then((resp) => {
                set_profile_img(resp["picture"])
                console.log(resp["picture"])
            }).catch((reason) => console.log(reason));
            else {
                localStorage.removeItem('token')
                localStorage.removeItem('token_id')
                set_token(undefined)
                router.refresh()
            }
        }).catch((reason) => console.log(reason));
    }

    const perform_login = () => {
        const redirect_url = window.location.href.split("?", 2)[0]
        var queries = "callback=true"
        if (search_params.size > 0) queries += `&${search_params.toString()}`

        fetch("backend/client_code", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "client_type": "web",
                "redirect_uri": `${redirect_url}?${queries}`
            })
        }).then((resp) => {
            if (resp.ok) resp.json().then((resp) => {
                const client_code = resp["client_code"]
                sessionStorage.setItem("client_code", client_code)
                router.push(`backend/login?client_code=${client_code}`);
            }).catch((reson) => console.log(reson));
        }).catch((reson) => console.log(reson));
    }

    useEffect(() => {
        set_is_result_page(pathname == "/results")

        const access_token = localStorage.getItem("token")
        if (access_token) set_token(access_token)
        if (access_token != null) load_profile(access_token)

        if (search_params.has("callback") && search_params.get("callback") == "true") {
            const code = sessionStorage.getItem("client_code")
            if (code != null) {
                sessionStorage.removeItem("client_code")
                fetch(`backend/token?client_code=${code}`).then((resp) => {
                    if (resp.ok) resp.json().then((resp) => {
                        const access_token = resp['token']
                        set_token(access_token)
                        localStorage.setItem("token", access_token)
                        localStorage.setItem("token_id", resp['_id'])
                        load_profile(access_token)

                        const queries = search_params.toString().replace("callback=true", "")
                        router.replace(`${pathname}?${queries}`)
                    })
                })
            }
        }
    }, []) 

    useEffect(() => set_search_key(search ?? ""), [search])

    const button_dimensions = `px-4 py-1 duration-150 rounded-md`

    const secondary_button_color_scheme = `
        border
        dark:bg-[#181818]
        text-black dark:text-white 
        border-black dark:border-0
        hover:bg-gray-100 dark:hover:bg-[#404040] 
        active:bg-gray-200 dark:active:bg-[#404040]`

    const primary_button_color_scheme = `
        text-white  
        bg-black dark:bg-white/20
        hover:bg-gray-800 dark:hover:bg-white/25
        active:bg-gray-700 dark:active:bg-white/30`

    return (
        <div className={`flex flex-none flex-col h-14 px-4 sticky top-0 backdrop-blur-md z-10 bg-white/80 shadow-md dark:bg-[#2c2c2ce0] ${className}`}>
            <div className="flex items-center gap-3 h-full">
                <div className="pr-2 py-1 text-lg font-bold dark:text-white" onClick={() => router.push('/')}>
                    milesmart
                </div>

                <div hidden={ search_enabled } className="grow flex justify-center">
                    <input placeholder="Search" className="dark:bg-[#404040] bg-gray-200 flex-1 max-w-[480px] w-full rounded-md px-2 py-1 duration-150 placeholder:text-gray-500 dark:placeholder:text-gray-300 placeholder:text-center text-center" style={{outline: "none"}} 
                    value={ search ?? search_key } 
                    onChange={(e) => on_search_changed?.(e.target.value) ?? set_search_key(e.target.value)} 
                    onKeyDownCapture={(e) => {
                        if (e.key == 'Enter') on_search?.(search_key) ?? router.push(`results?sk=${search_key}`)
                    }}/>
                </div>

                <div className="flex gap-1">
                    <button hidden={ !(buy_enabled ?? !is_result_page) } className={`${button_dimensions} ${primary_button_color_scheme}`} onClick={ () => on_buy_clicked?.() ?? router.push(`results`)}>Buy</button>

                    <button hidden={ !sell_enabled } className={`${button_dimensions} ${primary_button_color_scheme}`} onClick={ () => on_sell_clicked?.() ?? (token == undefined? perform_login(): router.push(`sell`))}>Sell</button>

                    <button hidden={ token != undefined } className={`${button_dimensions} ${primary_button_color_scheme}`} onClick={perform_login}>Login</button>

                    <Image alt="profile_image" width={-1} height={-1} src={profile_img} referrerPolicy="no-referrer" hidden={ token == undefined } className="h-9 w-9 rounded-full mx-2 overflow-clip object-cover hover:outline-2 hover:outline-black" onClick={ () => on_profile_clicked?.() ?? router.push(`profile`)}/>
                </div>
            </div>
        </div>
    )
}