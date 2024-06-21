< [Home](../../../BackendAPIs.md#vehicle-endpoints)
# List Tokens of Authenticated User
- Endpoint: `/user/tokens` `GET`
- Authentication Required as Normal User
## Query Parameters:
- `page: int` Page Number
- `page_size: int` Page Size
## Response Schemas
```
Response Code: 200


{
    pages: int
    results: [
        {
            _id: string,
            token: string,
            timestamp: string,
            uid: string
        }
    ]
}
```