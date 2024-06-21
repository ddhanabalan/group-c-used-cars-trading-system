< [Home](../../BackendAPIs.md#file-storage-endpoints)
# Download/View Files
- Endpoint: `/files/<id>` `GET`
- No Authentication Required
## Query Parameters:
- `download: bool` Whether send the file as attachment
## Path Parameters:
- `id: lond` File ID (**Required**)
## Response Schemas
- Response Code: 200
    > The file is served as response