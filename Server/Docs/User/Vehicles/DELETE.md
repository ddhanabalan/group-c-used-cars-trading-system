< [Home](../../../BackendAPIs.md#vehicle-endpoints)
# Delete The Details of a Vehicle
- Endpoint: `/user/vehicles/<id>` `DELETE`
- Authentication Required as Normal User
## Path Parameters:
- `id: long` Vehicle ID **(Required)**

## Response Schemas
- Response Code: 200
    ```
    {}
    ```
    > If id not found response code will be 404