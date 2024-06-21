< [Home](../../../BackendAPIs.md#file-storage-endpoints)
# Get The File Metadata
- Endpoint: `/user/files/<id>` `GET`
- Authentication Required as Normal User
## Path Parameters:
- `id: string` File ID
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
```