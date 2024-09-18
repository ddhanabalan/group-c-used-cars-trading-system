'use server'

import { BackendResponse } from "@/components/atrributes"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { setTimeout } from "timers/promises"

const server_url = 'http://localhost:5000'
const ui_server_url = 'http://localhost:3000'
const client_id = 'admin.client1'
const password = `${client_id}.password`
 
export async function login(callback: string) {
    const cookieStore = cookies()
    cookieStore.set('callback', callback)

    // console.log('Fetching Client Code...')

    const client_code_resp = await fetch(new URL('client_code', server_url), {
        headers: { 
            'Authorization': `Basic ${ btoa(`${client_id}:${password}`) }`,
            'Content-Type': 'application/json' 
        },
        method: "POST",
        body: JSON.stringify({
            "client_type": "web",
            "redirect_uri": new URL('callbacks/login', ui_server_url).toString()
        })
    })

    if (!client_code_resp.ok) throw new Error(await client_code_resp.text());
    const client_code = (await client_code_resp.json())['client_code']
    cookieStore.set('client_code', client_code)

    // console.log(`Client code: ${client_code}\nredirecting...`)

    redirect(new URL(`login?client_code=${client_code}`, server_url).toString())
}

export async function logout() {
    'use server'
    const cookieStore = cookies()
    const token_id = cookieStore.get('token_id')?.value
    if (token_id == undefined) return;
    
    await backendFetch(`user/tokens/${token_id}`, { method: 'DELETE' })
    cookieStore.delete('token_id')
    cookieStore.delete('token')
}

export async function deleteAccount() {
    'use server'
    const cookieStore = cookies()
    const token_id = cookieStore.get('token_id')?.value
    if (token_id == undefined) return;
    
    await backendFetch(`user`, { method: 'DELETE' })
    cookieStore.delete('token_id')
    cookieStore.delete('token')
}

export async function backendFetch(input: string | URL, init: RequestInit = {}) {
    const cookieStore = cookies();
    init.headers = init.headers as Record<string, string> ?? {}
    init.headers['Client'] = client_id;
    init.headers['Password'] = password;
    if ((cookieStore.get('token')?.value?.length ?? 0) > 0) init.headers['Authorization'] = `Bearer ${cookieStore.get('token')?.value}`
    const url = new URL(input, server_url)

    const resp: Response = await fetch(url, init);

    return {
        data: resp.ok? await resp.json(): undefined,
        status: resp.status,
        ok: resp.ok,
        headers: resp.headers
    } as BackendResponse
}

export async function lag() {
    await setTimeout(3000)
}