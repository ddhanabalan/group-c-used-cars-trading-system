< [Home](../../../BackendAPIs.md#file-storage-endpoints)
# List Files of Authenticated User
- Endpoint: `/user/files` `GET`
- Authentication Required as Normal User
## Query Parameters:
- `sk: string` Filename
- `page: int` Page Number
## Response Schemas
```
Response Code: 200


{
    pages: int
    results: [
        {
            _id: string,
            filename: string,
            length: long,
            uploadDate: string,
            owner: {
                _id: long,
                name: string,
                phone: string,
                email: string,
                role: string
            }
        }
    ]
}
```