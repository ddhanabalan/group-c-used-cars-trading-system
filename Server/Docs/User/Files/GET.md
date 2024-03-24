# Get The File Metadata
- Endpoint: `/user/files/<id>` `GET`
- Authentication Required as Normal User
## Path Parameters:
- `id: long` File ID
## Response Schemas
- Response Code: 200
    ```
    {
        _id: long,
        path: string,
        owner: owner: {
            _id: long,
            name: string,
            phone: string,
            email: string,
            role: string
        }
    }
    ```