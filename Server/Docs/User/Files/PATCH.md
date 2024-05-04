< [Home](../../../BackendAPIs.md#file-storage-endpoints)
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
```
Response Code: 200

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
```s