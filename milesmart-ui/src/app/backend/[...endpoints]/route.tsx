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

export async function GET(request: NextRequest, { params }: { params: { endpoints: string[] } }) {
    const search_params = request.nextUrl.searchParams
    const url = `${server_url}/${params.endpoints.join('/')}`
    const headers = request.headers
    
    reparse_headers(headers)
    
    return await fetch(search_params.size > 0? `${url}?${search_params.toString()}`: url, {
        method: 'GET',
        headers: headers
    })
}

export async function POST(request: NextRequest, { params }: { params: { endpoints: string[] } }) {
    const url = `${server_url}/${params.endpoints.join('/')}`
    const headers = request.headers
    const body = await request.json()

    reparse_headers(headers)

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    })
}

export async function DELETE(request: NextRequest, { params }: { params: { endpoints: string[] } }) {
    const url = `${server_url}/${params.endpoints.join('/')}`
    const headers = request.headers
    const search_params = request.nextUrl.searchParams

    reparse_headers(headers)

    return await fetch(search_params.size > 0? `${url}?${search_params.toString()}`: url, {
        method: 'DELETE',
        headers: headers
    })
}

export async function PATCH(request: NextRequest, { params }: { params: { endpoints: string[] } }) {
    const url = `${server_url}/${params.endpoints.join('/')}`
    const headers = request.headers
    const body = await request.json()

    reparse_headers(headers)

    return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: headers
    })
}