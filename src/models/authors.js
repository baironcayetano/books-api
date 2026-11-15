import { getDb } from "../db/connect.js"

const createAuthor = async (newAuthor) => {
	const author = await getAuthorById(newAuthor.id);
	if(author){
		throw new Error("duplicated custom id");
	}

	return await getDb().collection("authors").insertOne(newAuthor);
}

const getAllAuthors = async () => {
    return await getDb().collection("authors").find().toArray();
}

const getAuthorById = async (authorId) => {
    return await getDb().collection("authors").findOne({id: authorId});
}

/** returns an object with counts such as matchedCount and modifiedCount */
const updateAuthorById = async (authorId, updatedAuthor) => {
	return await getDb().collection("authors").updateOne({id: authorId}, {$set: updatedAuthor})
}

/** returns an object with deletedCount. 1 means a document was deleted and 0 means document not found */
const deleteAuthorById = async (authorId) => {
	return await getDb().collection("authors").deleteOne({id: authorId});
}

export { createAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById };