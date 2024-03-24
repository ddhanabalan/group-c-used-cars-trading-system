# Upload Files
- Endpoint: `/user/files` `POST`
- Authentication Required as Normal User
- Required Header `Content-Type: multipart/form-data`
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