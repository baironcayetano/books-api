import { getAllAuthors, getAuthorById } from "../models/authors.js";

const SERVER_ERR = "Internal Server Error"; 
const NOT_FOUND = "Author not found";

const getAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({"message": SERVER_ERR});
    }
}

const getAuthorByIdHander = async (req, res) => {
    const authorId = req.params.id;
    try {
        const author = await getAuthorById(authorId);
        if(!author){
            return res.status(404).json({message: NOT_FOUND});
        }
        return res.status(200).json(author);
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({message: SERVER_ERR});        
    }
}

export { getAuthorsHandler, getAuthorByIdHander};