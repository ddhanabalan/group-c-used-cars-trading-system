< [Home](../../../BackendAPIs.md#vehicle-endpoints)
# List Vehicles of Authenticated User
- Endpoint: `/user/vehicles` `GET`
- Authentication Required as Normal User
## Body Parameters:
- `sk: string` Search Key
- `price_min: int` Price Filter Min Value
- `price_max: int` Price Filter Max Value
- `odo_min: int` Odometer Filter Min Value
- `odo_max: int` Odometer Filter Max Value
- `year_min: int` Year Filter Min Value
- `year_max: int` Year Filter Max Value
- `fuel_types: [string]` Fuel Filter
- `page: int` Page Number
## Response Schemas
- Response Code: 200
    ```
    {
        min_price: int,
        max_price: int,
        min_odo: int,
        max_odo: int,
        min_year: int,
        max_year: int,
        pages: int,
        fuel_types: [string],
        results: [
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
        ]
    }
    ```