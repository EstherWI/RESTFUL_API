# ShawAndPartnersTest

Backend for a web application that allows users to load a CSV file with preformatted data and display the data as cards on the website.

## Requirements

- [X] Upload a csv file
- [X] Search Users
- [X] Node RESTful API
- [ ] Errors handling
- [ ] Automated Tests 

## Endpoints
- [X] [POST /api/files] An endpoint that accepts a CSV file upload from the frontend and stores the data in a database or a data structure. You should use the key "file" in the body request.
- [X] [GET /api/users] Should include an endpoint that allows the frontend to search through the loaded CSV data. This route should accept a ?q= query parameter for search terms and should search through EVERY column of the CSV. The filter should search for partial matches and also be case insensitive.

## Node Version
- v18.16.1

## Install and Run

```properties
npm install
npm run dev
```  

## Testing

```properties
npm run test
```  


## CSV Data Example

The CSV file structure that will be used for testing the software should follow this format:

```csv
name,city,country,favorite_sport
John Doe,New York,USA,Basketball
Jane Smith,London,UK,Football
Mike Johnson,Paris,France,Tennis
Karen Lee,Tokyo,Japan,Swimming
Tom Brown,Sydney,Australia,Running
Emma Wilson,Berlin,Germany,Basketball
```  

