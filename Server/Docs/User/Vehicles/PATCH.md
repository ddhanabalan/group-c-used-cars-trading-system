< [Home](../../../BackendAPIs.md#vehicle-endpoints)
# Update The Details of a Vehicle
- Endpoint: `/user/vehicles/<id>` `PATCH`
- Authentication Required as Normal User
- Required Header `Content-Type: application/json`
## Path Parameters:
- `id: long` Vehicle ID **(Required)**
## Body Parameters:
- `condition: string` Current Condition of the Vehicle
- `cylinders: int` No of Cylinders
- `description: string` Description on the Vehicle
- `drive: string` Drive of the Vehicle
- `fuel: string` Fuel Type of the Vehicle
- `manufacturer: string` Manufacturer of the Vehicle
- `model: string` Model name of the Vehicle
- `odometer: long` Current Odometer reading
- `paint_color: string` Paint color of the Vehicle
- `price: int` Price of Selling
- `size: string` Size of the Vehicle
- `state: string` Location of Vehicle Owner
- `title_status: string` Title Status of the Vehicle
- `transmission: string` Transimission Type of the Vehicle
- `type: string` Vehicle Type
- `VIN: string` Vehicle VIN Number
- `year: int` Vehicle Year of Release
## Response Schemas
- Response Code: 200
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