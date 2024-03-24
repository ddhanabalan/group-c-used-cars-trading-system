# Update The File or File Metadata
- Endpoint: `/user/files/<id>` `PATCH`
- Authentication Required as Normal User
- Required Header `Content-Type: application/json`
## Path Parameters:
- `id: long` File ID **(Required)**
## Body Parameters:
- `path: string` Filename/Path
- `file: file` The File object
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
    > If id not found response code will be 404