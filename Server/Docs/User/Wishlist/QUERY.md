< [Home](../../../BackendAPIs.md#biding-or-wishlisting-endpoints)
# List Wishlisted Vehicles of Authenticated User
- Endpoint: `/user/wishlist` `GET`
- Authentication Required as Normal User
## Query Parameters:
- `page: int` Page Number
- `page_size: int` Page Size
## Response Schemas
```
Response Code: 200


{
    pages: int
    results: [
        {
            _id: string,
            owner: {
                _id: long,
                name: string,
                phone: string,
                email: string,
                role: string
            },
            vehicle: {
                _id: long
                condition: string  
                cylinders: int|null, 
                description: string, 
                drive: string|null, 
                fuel: string, 
                manufacturer: string, 
                model: string, 
                odometer: long, 
                owner: {
                    _id: long,
                    name: string,
                    phone: string,
                    email: string,
                    role: string
                },
                paint_color: string|null,
                posting_date: string,
                price: int,
                size: string|null,
                state: string,
                title_status: string|null,
                transmission: string,
                type: string|null,
                VIN: string|null,
                year: int
            }
        }
    ]
}
```