import { NextRequest } from "next/server"

const server_url = 'http://localhost:5000'

export async function GET(request: NextRequest) {
    const search_params = request.nextUrl.searchParams
    const url = `${server_url}/login`
    return Response.redirect(search_params.size > 0? `${url}?${search_params.toString()}`: url)
}