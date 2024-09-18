import { ChangeEventHandler, ReactElement, Key } from "react"

export type ComponentAttributes = { className?:string, hidden?: boolean }

export type FavoriteIconAttributes = ComponentAttributes & { toggled?: boolean }

export type BackendResponse = {
    status: number,
    ok: boolean,
    data?: any,
    headers: object
}

export type Vehicle = { 
    _id: string, 
    fuel: string, 
    image_urls: string[],
    manufacturer: string,
    model: string,
    odometer: number,
    price: number,
    state: string,
    transmission: string,
    year: number 
    wishlist_id?: Wishlist,
    condition?: string,
    drive?: string
    description: string,
    owner: User
}

export type Wishlist = {
    _id: string,
    owner: string,
    vehicle: string | Vehicle
}

export type User = {
    _id: string,
    name: string,
    first_name: string,
    picture: string,
    privilege: number,
    phone?: string,
    email: string
}

export type SearchResult<T> = {
    count: number,
    _id?: string|number,
    fuel_types: string[],
    max_odometer?: number,
    max_price?: number,
    max_year?: number,
    min_odometer?: number,
    min_price?: number,
    min_year?: number,
    pages?: number,
    results: T[]
}

export type PageAttributes = {
    pathParams?: { [key: string]: string | string[] },
    searchParams?: { [key: string]: string | string[] }
}