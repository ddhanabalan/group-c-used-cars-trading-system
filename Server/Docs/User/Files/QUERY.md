# List Files of Authenticated User
- Endpoint: `/user/files` `GET`
- Authentication Required as Normal User
## Body Parameters:
- `sk: string` Filename
- `page: int` Page Number
## Response Schemas
- Response Code: 200
    ```
    {
        pages: int
        results: [
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
        ]
    }
    ```