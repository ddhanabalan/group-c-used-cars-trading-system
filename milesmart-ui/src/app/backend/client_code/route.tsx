import { NextRequest } from "next/server"

const server_url = 'http://localhost:5000'

function reparse_headers(headers: Headers) {
    headers.set('Client', 'admin.client1')
    headers.set('Password', 'admin.client1.password')

    headers.delete('accept-encoding')
    headers.delete('connection')
    headers.delete('content-length')
    headers.delete('host')
    headers.delete('x-forwarded-for')
    headers.delete('x-forwarded-host')
    headers.delete('x-forwarded-port')
    headers.delete('x-forwarded-proto')
}

export async function POST(request: NextRequest) {
    const url = `${server_url}/client_code`
    const headers = request.headers
    const body = await request.json()

    reparse_headers(headers)
    headers.set('Authorization', `Basic ${ btoa('admin.client1:admin.client1.password') }`)

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    })
}