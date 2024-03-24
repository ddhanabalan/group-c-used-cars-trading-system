# Delete The Details of a Vehicle
- Endpoint: `/user/vehicles/<id>` `PATCH`
- Authentication Required as Normal User
## Path Parameters:
- `id: long` Vehicle ID **(Required)**

## Response Schemas
- Response Code: 200
    ```
    {}
    ```
    > If id not found response code will be 404