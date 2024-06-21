< [Home](../../BackendAPIs.md#user-endpoints)
# Get The Details of Authenticated User
- Endpoint: `/user` `GET`
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
}
```