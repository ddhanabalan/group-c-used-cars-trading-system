< [Home](../../BackendAPIs.md#user-endpoints)
# Delete the Authenticated User Account
> Removes all belongings of the user
- Endpoint: `/user` `DELETE`
- Authentication Required as Normal User

## Response Schemas
```
Response code: 200

{
    _id: string,
    email: string,
    first_name: string,
    gender: string|null,
    name: string,
    phone: string|null,
    picture: string,
    privilege: int
    vehicles: [
        {
            _id: long
            condition: string  
            cylinders: int|null, 
            description: string, 
            drive: string|null, 
            fuel: string, 
            manufacturer: string, 
            model: string, 
            odometer: long, 
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
    ],
    files: [
        {
            _id: string,
            filename: string,
            length: long,
            uploadDate: string
        }
    ],
    wishlist: [
        {
            _id: string,
            vehicle: string
        }
    ],
    tokens: [
        {
            _id: string,
            timestamp: string,
            token: string
        }
    ]
}
```

> If id not found response code will be 404