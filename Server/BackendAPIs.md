# Milesmart Backend APIs
This article includes the details of all APIs that are planned to implement and are already implemented in the server of milesmart.
## Vehicle Endpoints
> Arrives in Week 3. Targeting Demo 3
- `/vehicles` `GET` [List Vehicles Globally](Docs/Vehicles/QUERY.md) *(Ready To Use)*
- `/vehicles/<id>` `GET` [Fetch Details of A Vehicle](Docs/Vehicles/GET.md) *(Ready To Use)*
- `/vehicles/<id>` `DELETE` [Delete Details of A Vehicle](Docs/Vehicles/DELETE.md) *(Ready To Use)*
- `/user/vehicles` `GET` [List Vehicles of Authenticated User](Docs/User/Vehicles/QUERY.md) *(Ready To Use)*
- `/user/vehicles` `POST` [Create New Vehicle](Docs/User/Vehicles/POST.md) *(Ready To Use)*
- `/user/vehicles/<id>` `GET` [Fetch Details of Vehicle of Authenticated User](Docs/User/Vehicles/GET.md) *(Planning to Drop)*
- `/user/vehicles/<id>` `PATCH` [Update Vehicle Details](Docs/User/Vehicles/PATCH.md) *(Ready To Use)*
- `/user/vehicles/<id>` `DELETE` [Delete Vehicle Details](Docs/User/Vehicles/DELETE.md) *(Ready To Use)*

## File Storage Endpoints
> Arrives in Week 3. Targeting Demo 3
- `/files/<id>` `GET` [Download/View a File](Docs/Files/GET.md) *(Ready To Use)*
- `/files/<id>` `DELETE` [Delete a File](Docs/Files/DELETE.md) *(Ready To Use)*
- `/user/files` `GET` [List Current User Files Metadata](Docs/User/Files/QUERY.md) *(Ready To Use)*
- `/user/files` `POST` [Upload a File](Docs/User/Files/POST.md) *(Ready To Use)*
- `/user/files/<id>` `GET` [View The File metadata](Docs/User/Files/GET.md) *(Ready To Use)*
- `/user/files/<id>` `PATCH` [Update File or File metadata](Docs/User/Files/PATCH.md) *(Postponed to Week 3)*
- `/user/files/<id>` `DELETE` [Delete a File](Docs/User/Files/DELETE.md) *(Ready To Use)*
## User Endpoints
> Arrives in Week 3. Targeting Demo 3
- `/user` `GET` [Get Details of Authenticated User](Docs/User/GET.md) *(Ready To Use)*
- `/user` `PATCH` [Update Details of Authenticated User](Docs/User/PATCH.md) *(Ready To Use)*
- `/user` `DELETE` [Close Account of Authenticated User](Docs/User/DELETE.md) *(Ready To Use)*
- `/users` `GET` [Search for Users](Docs/Users/QUERY.md) *(Ready To Use)*
- `/users/<id>` `GET` [Get Detailes of a User](Docs/Users/GET.md) *(Ready To Use)*
- `/actions/users/<id>` `POST` [Apply Admin Actions on a User](Docs/Actions/Users/POST.md) *(Ready To Use)*

## Token Management APIs
> Arrives in Week 4. Targeting Demo 3
- `/user/tokens` `GET` [List my tokens](Docs/User/Tokens/QUERY.md) *(Ready To Use)*
- `/user/tokens/<id>` `DELETE` [Revoke a token](Docs/User/Tokens/DELETE.md) *(Ready To Use)*

## Biding or Wishlisting Endpoints
> Arrives in Week 4. Targeting Demo 3
- `/bids` `POST` [Make a Biding on a Vehicle](Docs/POST.Bids.md)
- `/bids/<id>` `GET` [Get Details of a Biding](Docs/GET.Bid.md)
- `/user/bids` `GET` [List All the Biding of Authenticated User](Docs/user/GET.Bids.md)
- `/user/bids/<id>` `GET` [Get Details of a Biding of Authenticated User](Docs/GET.Bid.md)
- `/user/bids/<id>` `PATCH` [Update Details of a Biding of Authenticated User](Docs/PATCH.Bid.md)
- `/user/bids/<id>` `DELETE` [Delete Details of a Biding of Authenticated User](Docs/DELETE.Bid.md)
- `/user/wishlist` `GET` [List all Vehicles in Wishlist of Authenticated User](Docs/User/Wishlist/QUERY.md) *(Ready to Use)*
- `/user/wishlist/<id>` `GET` [View specified wishlist item of Authenticated User](Docs/User/Wishlist/GET.md) *(Ready to Use)*
- `/user/wishlist` `POST` [Add a Vehicle to Wishlist of Authenticated User](Docs/User/Wishlist/POST.md) *(Ready to Use)*
- `/user/wishlist/<id>` `DELETE` [Remove a Vehicle from Wishlist of Authenticated User](Docs/User/Wishlist/DELETE.md) *(Ready to Use)*

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