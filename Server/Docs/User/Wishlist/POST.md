< [Home](../../../BackendAPIs.md#biding-or-wishlisting-endpoints)
# Create new Wishlist Item
- Endpoint: `/user/wishlist` `POST`
- Authentication Required as Normal User
- Required Header `Content-Type: application/json`
## Body Parameters:
- `vehicle: string` The vehicle ID
## Response Schemas
```
Response Code: 200

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
```