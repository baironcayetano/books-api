# Books API Week 02 Spec - Version 2 

## Purpose
Build a Books API in Express with support for CRUD operations, and with mongoDB storage.

## Feature 1: Book CRUD Operations and Author References

### Goal 
Update the existing week 01 book API so book documents include a reference 
to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model 
MongoDB database: `cse341-books-db`. MongoDB collection: `books`.

Book object:
- `id`: string (required)
- `authorId`: string (required) (references `id` from a Author document in collection `authors`)
- `title`: string (required)
- `publicationDate`: string in ISO 8601 date format (for example, "2021-08-17") (required)

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

## Endpoints
1. GET `/books`
- Description: Return all books 
- Success Status: `200`
- Error Status: `500`
- Success response body example:

    [{
		"id": "b1",
		"authorId": "a1",
		"title": "Pattern of Light",
		"publicationData": "2021-08-17"
	}]

2. GET `/books/:id`
- Description: Return one book by id.
- Success Status: `200`
- Not Found Status: `404`
- Error Status: `500`
- Success Response Body Example:

    {
        "id": "b1",
        "authorId": "a1",
	    "title": "Pattern of Light",
	    "publicationDate": "2021-08-17"
    } 

- Not Found Response Body Example:

    {"message": "Book not found"}

3. POST `/books`
- Description: Create a new book
- Success Status: `201`
- Bad Request Status: `400`
- Errors Status: `500`

- Request Body Example:

    {
        "id": "b4",
        "authorId": "a1",
        "title": "Example Book Title",
        "publicationDate": "2026-01-15"
    }

- Sucess Response Body Example (the new created object):
    {
        "id": "b4",
        "authorId": "a1",
        "title": "Example Book Title",
        "publicationDate": "2026-01-15"
    }

4. PUT `/books/:id`
- Description: Update an existing book by its id
- Success Status: `200`
- Bad Request Status: `400`
- Not Found Status: `404`
- Error Status: `500`
- Request Body Example:

    {
        "authorId": "a2",
        "title": "Updated Book Title",
        "publicationDate": "2026-02-20"
    }

- Sucess Response Body Example (the updated book object):

    {
        "id": "b4",
        "authorId": "a1",
        "title": "Example Book Title",
        "publicationDate": "2026-01-15"
    }

- Not Found Response Body Example:

    { "message": "Book not found"}


5. DELETE `/books/:id`
- Description: Delete an existing book by its id
- Success Status: `204`
- Not Found Status: `404`
- Error Status: `500`
- Success Response Body: none
- Not Found Response Body Example:

    { "message": "Book not found"}

## Feature 2: Author CRUD Operations 

### Goal
Update the existing API to include a collection `authors` that stores the author `id`s, `name`s and `birthYear`s. The new endpoints for the author collection should support all CRUD operations. Every route must be documented and testable in Swagger.

### Data Model
MongoDB database: `cse341-books-db`. MongoDB collection: `authors`.

Author object:
- `id`: string (required)
- `name`: string (required)
- `birthYear`: string in ISO 8601 date format (for example, "1998-08-17") (required)

Authors will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

## Endpoints

1. GET `/authors`
- Description: Return all authors 
- Success Status: `200`
- Error Status: `500`
- Success response body example:

    [{
		"id": "a1",
		"name": "John Example",
		"birthYear": "1998-08-17"
	}]

2. GET `/authors/:id`
- Description: Return one author by its custom id.
- Success Status: `200`
- Not Found Status: `404`
- Error Status: `500`
- Success Response Body Example:

    {
        "id": "a1",
        "name": "John Example",
	    "birthYear": "1998-08-17"
    } 

- Not Found Response Body Example:

    {"message": "Author not found"}


3. POST `/authors`
- Description: Create a new author
- Success Status: `201`
- Bad Request Status: `400`
- Error Status: `500`
- Request body example (the newly created author object):

    {
        "name": "John Example",
        "birthYear": "2026-01-15",
    }

- Sucess response body example (the newly created author object):
  
    {
        "id": "b4",
        "name": "John Example",
        "birthYear": "2026-01-15",
    }

4. PUT `/authors/:id`
- Description: Update an existing author by its custom id.
- Success Status: `200`
- Bad Request Status: `400`
- Not Found Status: `404`
- Error Status: `500`
- Request body example:

    {
        "name": "John Example",
        "birthYear": "1998-02-20"
    }
- Sucess response body example (the new updated author object): 
    {
        "id": "a1",
        "name": "John Example",
        "birthYear": "1998-02-20"
    }

- Not Found Response Body Example:

    {"message": "Author not found"}

5. DELETE  `/authors/:id`
- Description: Delete an existing author by its custom id.
- Success Status: `204`
- Not Found Stauts: `404`
- Error Status: `500`
- Success response body: `none`
- Not Found response body example:

    { "message": "Author not found"}


## Bad Request Handling
- Return simple messages for 400 errors:
{
    "message": "Bad request. Invalid data"
}

## Error Handling 
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
	"message": "Internal server error"
}

### Swagger Documentation 
Swagger must document every book and author route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Implementation Notes
- Use two MongoDB collections named "books" and "authors".
- Seed the collections with the book and author documents needed for testing 
- Use enviroment variables for the MongoDB connection.

## Out of Scope for Week 2
- Authentication and authorization