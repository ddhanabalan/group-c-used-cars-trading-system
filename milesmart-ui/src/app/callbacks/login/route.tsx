import { backendFetch } from "@/app/actions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
    // console.log(`Callback redirecting...`)
    const cookieStore = cookies()
    const client_code = cookieStore.get('client_code')?.value ?? '0'
    const { data } = await backendFetch(`token?client_code=${client_code}`)
    cookieStore.set('token_id', data['_id'], { maxAge: 60 * 60 * 24 * 365, httpOnly: true })
    cookieStore.set('token', data['token'], { maxAge: 60 * 60 * 24 * 365, httpOnly: true })
    const callback = cookieStore.get('callback')?.value ?? '/'
    redirect(callback)
}