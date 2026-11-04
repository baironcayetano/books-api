# Books API Spec

## Purpose
Build a read-only Books API in Express with MongoDB storage.

## Data Model
MongoDB database: `cse341-books-db`
MongoDB collection: `books`

Book object: 
- `id`: string (required)
- `author`: string (required)
- `title`: string (required)
- `publicationDate`: string in ISO 8601 date format (for example, "2021-08-17") (required)

## Endpoints
1. GET `/books`
- Description: Return all books 
- Success Status: `200`
- Error Status: `500`
- Success response body example:
[
	{
		"id": "b1",
		"author": "Maya Rivera",
		"title": "Pattern of Light",
		"publicationData": "2021-08-17"
	}
]

2. GET `/books/:id`
- Description: Return one book by id.
- Success Status: `200`
- Not Found Status: `404`
- Error Status: `500`
- Success Response Body Example:
{
	"id": "b1",
	"author": "Maya Rivera",
	"title": "Pattern of Light",
	"publicationDate": "2021-08-17"
} 

- Not Found Response Body Example:
{
	"message": "Book not found"
}

## Error Handling 
- Do not return stack traces to clients.
- Return a simple message for 500 errors:
{
	"message": "Internal server error"
}

## Implementation Notes
- Use a MongoDB collection named "books".
- Seed the collection witht the book documents needed for testing 
- Use enviroment variables for the MongoDB connection.

## Out of Scope for Week 1 
- POST, PUT, DELETE routes
- Authentication and authorization
