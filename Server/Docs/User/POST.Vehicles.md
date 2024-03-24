# Create New Vehicle as Authenticated User as Owner
- Endpoint: `/user/vehicles` `POST`
- Authentication Required as Normal User
## Body Parameters:
- `condition: string` Current Condition of the Vehicle (**Required**)
- `cylinders: int` No of Cylinders
- `description: string` Description on the Vehicle (**Required**)
- `drive: string` Drive of the Vehicle
- `fuel: string` Fuel Type of the Vehicle (**Required**)
- `manufacturer: string` Manufacturer of the Vehicle (**Required**)
- `model: string` Model name of the Vehicle (**Required**)
- `odometer: long` Current Odometer reading (**Required**)
- `paint_color: string` Paint color of the Vehicle
- `price: int` Price of Selling (**Required**)
- `size: string` Size of the Vehicle
- `state: string` Location of Vehicle Owner (**Required**)
- `title_status: string` Title Status of the Vehicle
- `transmission: string` Transimission Type of the Vehicle (**Required**)
- `type: string` Vehicle Type
- `VIN: string` Vehicle VIN Number
- `year: int` Vehicle Year of Release (**Required**)
## Response Schemas
- Response Code: 201
    ```
    {}
    ```