# Milesmart Backend APIs
This article includes the details of all APIs that are planned to implement and are already implemented in the server of milesmart.
## Vehicle Endpoints *(Arrives in Demo 2: Week 2)*
- `/vehicles` `GET` [List Vehicles Globally](Docs/Vehicles/QUERY.md) *(Ready To Use)*
- `/vehicles/<id>` `GET` [Fetch Details of A Vehicle](Docs/Vehicles/GET.md) *(Ready To Use)*
- `/vehicles/<id>` `DELETE` [Delete Details of A Vehicle](Docs/Vehicles/DELETE.md) *(Ready To Use)*
- `/user/vehicles` `GET` [List Vehicles of Authenticated User](Docs/User/Vehicles/QUERY.md) *(Ready To Use)*
- `/user/vehicles` `POST` [Create New Vehicle](Docs/User/Vehicles/POST.md) *(Ready To Use)*
- `/user/vehicles/<id>` `GET` [Fetch Details of Vehicle of Authenticated User](Docs/User/Vehicles/GET.md) *(Planning to Drop)*
- `/user/vehicles/<id>` `PATCH` [Update Vehicle Details](Docs/User/Vehicles/PATCH.md) *(Ready To Use)*
- `/user/vehicles/<id>` `DELETE` [Delete Vehicle Details](Docs/User/Vehicles/DELETE.md) *(Ready To Use)*

## File Storage Endpoints *(Arrives in Demo 2: Week 2)*
- `/files/<id>` `GET` [Download/View a File](Docs/Files/GET.md) *(Ready To Use)*
- `/files/<id>` `DELETE` [Delete a File](Docs/Files/DELETE.md) *(Ready To Use)*
- `/user/files` `GET` [List Current User Files Metadata](Docs/User/Files/QUERY.md) *(Ready To Use)*
- `/user/files` `POST` [Upload a File](Docs/User/Files/POST.md) *(Ready To Use)*
- `/user/files/<id>` `GET` [View The File metadata](Docs/User/Files/GET.md) *(Ready To Use)*
- `/user/files/<id>` `PATCH` [Update File or File metadata](Docs/User/Files/PATCH.md) *(Postponed to Week 3)*
- `/user/files/<id>` `DELETE` [Delete a File](Docs/User/Files/DELETE.md) *(Ready To Use)*
## User Endpoints *(Arrives in Demo 2: Week 3)*

- `/user` `GET` [Get Details of Authenticated User](Docs/GET.User.md) *(Ready To Use)*
- `/user` `PATCH` [Update Details of Authenticated User](Docs/PATCH.User.md) *(Ready To Use)*
- `/user` `DELETE` [Close Account of Authenticated User](Docs/DELETE.User.md) *(Ready To Use)*
- `/users` `GET` [Search for Users](Docs/GET.User.md) *(Ready To Use)*
- `/users/<id>` `GET` [Get Detailes of a User](Docs/GET.User.md) *(Ready To Use)*
- `/actions/users/<id>` `POST` [Apply Admin Actions on a User](Docs/PATCH.User.md) *(Ready To Use)*

## Token Management APIs
- `/user/tokens` `GET` [List my tokens](Docs/User/Tokens/GET.md) *(Ready To Use)*
- `/user/tokens/<id>` `DELETE` [Revoke a token](Docs/User/Tokens/DELETE.md) *(Ready To Use)*

## Biding or Wishlisting Endpoints
- `/bids` `POST` [Make a Biding on a Vehicle](Docs/POST.Bids.md)
- `/bids/<id>` `GET` [Get Details of a Biding](Docs/GET.Bid.md)
- `/user/bids` `GET` [List All the Biding of Authenticated User](Docs/user/GET.Bids.md)
- `/user/bids/<id>` `GET` [Get Details of a Biding of Authenticated User](Docs/GET.Bid.md)
- `/user/bids/<id>` `PATCH` [Update Details of a Biding of Authenticated User](Docs/PATCH.Bid.md)
- `/user/bids/<id>` `DELETE` [Delete Details of a Biding of Authenticated User](Docs/DELETE.Bid.md)
- `/user/wishlist` `GET` [List all Vehicles in Wishlist of Authenticated User](Docs/User/GET.Wishlist.md)
- `/user/wishlist` `POST` [Add a Vehicle to Wishlist of Authenticated User](Docs/User/POST.Wishlist.md)
- `/user/wishlist/<id>` `DELETE` [Remove a Vehicle from Wishlist of Authenticated User](Docs/User/DELETE.Wishlist.md)

## How to Authenticate

1. Get a login access code from the endpoint `/client_code`
    - Basic Authentication is required with username as client_id and password as client_secret.
    - Response will be in the schema:
        ```
        { client_code: long }
        ```
    Sample Code
    ```
    http://client_id:client_password@api.milesmart.com/client_code
    ```
2. Open the `/login` endpoint with client_code as url argument in a new window or new tab of the browser
3. After the login, use `/token` endpoint to get the token by passing client_code as argument.
    Sample Code
    ```
    http://api.milesmart.com/token?client_code=s_token
    ```