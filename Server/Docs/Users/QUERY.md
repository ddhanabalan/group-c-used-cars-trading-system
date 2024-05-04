< [Home](../../BackendAPIs.md#token-management-apis)
# List Users Globally based on filters
- Endpoint: `/vehicles` `GET`
- No Authentication Required
## Query Parameters:
- `sk: string` Search Key
- `page: int` Page Number
- `page_size: int` Results Per Page
## Response Schemas
```
Response Code: 200

{
    pages: int,
    count: int
    results: [
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
    ]
}
```