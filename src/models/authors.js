import { getDb } from "../db/connect.js"

const getAllAuthors = async () => {
    return await getDb().collection("authors").find().toArray();
}

const getAuthorById = async (authorId) => {
    return await getDb().collection("authors").findOne({id: authorId});
}

export { getAllAuthors, getAuthorById };