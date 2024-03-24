# Get The Details of a Vehicle
- Endpoint: `/vehicles/<id>` `GET`
- No Authentication Required
## Path Parameters:
- `id: long` Vehicle ID **(Required)**
## Response Schemas
- Response code: 200 
    ```
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
    ```
    > If id not found response code will be 404