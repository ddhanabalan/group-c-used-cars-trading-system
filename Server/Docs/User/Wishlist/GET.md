< [Home](../../../BackendAPIs.md#biding-or-wishlisting-endpoints)
# View A Wishlisted Item
- Endpoint: `/user/wishlist/<id>` `GET`
- Authentication Required as Normal User
## Path Parameters:
- `id: string` Wishlist Item ID
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