import { getDb } from "../db/connect.js";
import { getAuthorById } from "./authors.js";

const createBook = async (newBook) => {
	const existingBook = await getBookById(newBook.id);
	if(existingBook){
		throw new Error("duplicated custom id");
	}

	const author = await getAuthorById(newBook.authorId); 
	if(!author){
		throw new Error("author does not exist");
	}

	return await getDb().collection("books").insertOne(newBook);
}

const getAllBooks = async () => {
	return await getDb().collection("books").find().toArray();
}

const getBookById = async (bookId) => {
	return await getDb().collection("books").findOne({id: bookId});
}
/** returns an object with counts such as matchedCount and modifiedCount */
const updateBookById = async (bookId, updatedBook) => {
	if(updatedBook.authorId){
		const author = await getAuthorById(updatedBook.authorId); 
		if(!author){
			throw new Error("author does not exist");
		}	
	}

	return await getDb().collection("books").updateOne({"id": bookId}, {$set: updatedBook})
}

/** returns an object with deletedCount. 1 means a document was deleted and 0 means document not found*/
const deleteBookById = async (bookId) => {
	return await getDb().collection("books").deleteOne({id: bookId});
}

export {createBook, getAllBooks, getBookById, updateBookById, deleteBookById};
