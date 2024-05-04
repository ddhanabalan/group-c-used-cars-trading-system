< [Home](../../../BackendAPIs.md#file-storage-endpoints)
# Delete Files
- Endpoint: `/user/files/<id>` `DELETE`
- Authentication Required as Normal User
## Path Parameters
- `id: string` The ID of the file (**Required**)
## Response Schemas
```
Response Code: 200

{
    _id: string,
    filename: string,
    length: long,
    uploadDate: string,
    owner: owner: {
        _id: long,
        name: string,
        phone: string,
        email: string,
        role: string
    }
}
```