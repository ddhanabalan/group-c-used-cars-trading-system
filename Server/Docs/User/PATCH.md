< [Home](../../BackendAPIs.md#user-endpoints)
# Update The Details of Authenticated User Account
- Endpoint: `/user` `PATCH`
- Authentication Required as Normal User
- Required Header `Content-Type: application/json`
## Body Parameters:
- `email: string` A valid email address
- `first_name: string` First Name for displaying
- `gender: string|null` Gender of the user
- `name: string` Profile Full Name
- `phone: string|null` Phone number
- `picture: string` Profile Picture URL
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

> If id not found response code will be 404