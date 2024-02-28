# Milesmart Backend Server Specification (v0.1-alpha)

This backend server is a REST API Server which provides the data for the Web App for its functioning. This server provides various endpoints that can be useful for data retrival and manipulations.

>This article covers the APIs implemented so far and the planned APIs.


**API Groups Available**
- Search & Query APIs
- File Storage APIs
- User Management APIs

## Search & Query APIs

This group provides various endpoints for data queries which includes from normal searches to admin level statistical data queries

- Endpoint `/vehicles` used for searching vehicles, It supports arguments such as
  - `sk={string}` used for searching specified names
  - `price_min={int}` & `price_max={int}` used for specifiying price range
  - `year_min={int}` & `year_max={int}` used for specifiying year range
  - `odo_min={int}` & `odo_max={int}` used for specifiying odometer range
  - `fuel_types={array[string]}` used for filtering specified fuel types (array elements delemeted by commas)
  - `page={int}` used for page number request (1 query will return 1 page which contains only 30 elements)
- Endpoint `/vehicle/<vid>` used for retriving all details of the vehicle specified by its vid

## Storage APIs

This group includes all file related operations such as uploads and downloads.

- Endpoint `/storage/upload` used for uploading files to the path provided via argument `path={string}`
- Endpoint `/storage/download` used for downloading files from the path provided via argument `path={string}`
- Endpoint `/storage/remove` used for clearing files from the path provided via argument `path={string}`
- Endpoint `/file/<path>` used for viewing the file via HTTP itself instead of downloading it.

> Other APIs are still in WIP. Soon everything will be released