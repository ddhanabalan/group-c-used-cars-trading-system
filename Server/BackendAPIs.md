# Milesmart Backend APIs
This article includes the details of all APIs that are planned to implement and are already implemented in the server of milesmart.
## Vehicle Endpoints
- `/vehicles` `GET` [List Vehicles Globally](Docs/Vehicles/QUERY.md) (*Ready To Use*)
- `/vehicles/<id>` `GET` [Fetch Details of A Vehicle](Docs/Vehicles/GET.md) (*Ready To Use*)
- `/vehicles/<id>` `DELETE` [Delete Details of A Vehicle](Docs/Vehicles/DELETE.md) (*Arrive in Phase 2*)
- `/user/vehicles` `GET` [List Vehicles of Authenticated User](Docs/User/Vehicles/QUERY.md) (*Arrive in Phase 2*)
- `/user/vehicles` `POST` [Create New Vehicle](Docs/User/Vehicles/POST.md) (*Arrive in Phase 2*)
- `/user/vehicles/<id>` `GET` [Fetch Details of Vehicle of Authenticated User](Docs/User/Vehicles/GET.md) (*Arrive in Phase 2*)
- `/user/vehicles/<id>` `PATCH` [Update Vehicle Details](Docs/User/Vehicles/PATCH.md) (*Arrive in Phase 2*)
- `/user/vehicles/<id>` `DELETE` [Delete Vehicle Details](Docs/User/Vehicles/DELETE.md) (*Arrive in Phase 2*)

## File Storage Enpoints (Dummy Available, Arrives in Phase 2)
- `/files/<id>` `GET` [Download/View a File](Docs/Files/GET.md)
- `/files/<id>` `DELETE` [Delete a File](Docs/Files/DELETE.md)
- `/user/files` `GET` [List Current User Files Metadata](Docs/User/Files/QUERY.md)
- `/user/files` `POST` [Upload a File](Docs/User/Files/POST.md)
- `/user/files/<id>` `GET` [View The File metadata](Docs/User/Files/GET.md)
- `/user/files/<id>` `PATCH` [Update File or File metadata](Docs/User/Files/PATCH.md)
- `/user/files/<id>` `DELETE` [Delete a File](Docs/User/Files/DELETE.md)
## User Endpoints

- `/user/info` `GET` [Get Details of Authenticated User](Docs/GET.User.md)
- `/user/info` `PATCH` [Update Details of Authenticated User](Docs/PATCH.User.md)
- `/user/info` `DELETE` [Close Account of Authenticated User](Docs/DELETE.User.md)
- `/users/<id>` `GET` [Get Details of a User](Docs/GET.User.md)
- `/users/<id>` `PUT` [Update Access Details of a User](Docs/PATCH.User.md)
- `/users/<id>` `DELETE` [Close Account of a User](Docs/DELETE.User.md)

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

1. Get a login access code from the endpoint `/session_token`
    - Basic Authentication is required with username as client_id and password as client_secret.
    - Response will be in the schema:
        ```
        { session_token: long }
        ```
    Sample Code
    ```
    http://client_id:client_password@api.milesmart.com/session_token
    ```
2. Open the `/login` endpoint with session_token as url argument in a new window or new tab of the browser
3. After the login, use `/token` endpoint to get the token by passing session_token as argument.
    Sample Code
    ```
    http://api.milesmart.com/token?session_token=s_token
    ```