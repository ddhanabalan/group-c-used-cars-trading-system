< [Home](../../BackendAPIs.md#user-endpoints)
# Get The Details of a User Account
- Endpoint: `/users/<id>` `GET`
- No Authentication Required
## Path Parameters:
- `id: string` User ID **(Required)**
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
}
```