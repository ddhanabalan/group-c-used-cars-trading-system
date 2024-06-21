< [Home](../../../BackendAPIs.md#token-management-apis)
# Delete The Details of a Vehicle
- Endpoint: `/user/vehicles/<id>` `DELETE`
- Authentication Required as Normal User
## Path Parameters:
- `id: string` Vehicle ID **(Required)**

## Response Schemas
```
Response Code: 200

{
    _id: string,
    token: string,
    timestamp: string,
    uid: string
}
```