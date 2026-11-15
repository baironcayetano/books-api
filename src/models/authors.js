import { getDb } from "../db/connect.js"

const getAuthorById = async (authorId) => {
    return await getDb().collection("authors").findOne({id: authorId});
}

export { getAuthorById };