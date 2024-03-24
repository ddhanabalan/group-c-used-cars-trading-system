# Milesmart Backend APIs
This article includes the details of all APIs that are planned to implement and are already implemented in the server of milesmart.
## Vehicle Endpoints
- `/vehicles` `GET` [List Vehicles Globally](Docs/Vehicles.md) (*Ready To Use*)
- `/vehicles/<id>` `GET` [Fetch Details of A Vehicle](Docs/Vehicle.md) (*Ready To Use*)
- `/vehicles/<id>` `DELETE` [Delete Details of A Vehicle](Docs/DELETE.Vehicle.md) (*Arrive in Demo 2*)
- `/user/vehicles` `GET` [List Vehicles of Authenticated User](Docs/User/GET.Vehicles.md) (*Arrive in Demo 2*)
- `/user/vehicles` `POST` [Create New Vehicle](Docs/User/POST.Vehicles.md) (*Arrive in Demo 2*)
- `/user/vehicles/<id>` `GET` [Fetch Details of Vehicle of Authenticated User](Docs/User/GET.Vehicle.md) (*Arrive in Demo 2*)
- `/user/vehicles/<id>` `PATCH` [Update Vehicle Details](Docs/User/PATCH.Vehicle.md) (*Arrive in Demo 2*)
- `/user/vehicles/<id>` `DELETE` [Delete Vehicle Details](Docs/User/DELETE.Vehicle.md) (*Arrive in Demo 2*)

## User Endpoints

- `/user` `GET` [Get Details of Authenticated User](Docs/GET.User.md)
- `/user` `PATCH` [Update Details of Authenticated User](Docs/PATCH.User.md)
- `/user` `DELETE` [Close Account of Authenticated User](Docs/DELETE.User.md)
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
