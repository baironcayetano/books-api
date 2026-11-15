import { createAuthor, deleteAuthorById, getAllAuthors, getAuthorById, updateAuthorById } from "../models/authors.js";

const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
const SERVER_ERR = "Internal Server Error"; 
const NOT_FOUND = "Author not found";
const BAD_REQ = "Bad Request. Invalid Data";

const postAuthorHandler = async (req, res) => {
    try{
        const author = req.body;

        //validate entries
        if(!author || !author.id || !author.name || !author.birthYear){
            return res.status(400).json({message: BAD_REQ});
        }

        //validate date format
        if(!isoRegex.test(author.birthYear)){
            return res.status(400).json({message: BAD_REQ});
        }

        await createAuthor(author);
        return res.status(201).json(author);

    }catch(error){

        if(error.message === "duplicated custom id"){
            return res.status(400).json({message: BAD_REQ});
        }

        console.error("Error: ", error.message);
        return res.status(500).json({message: SERVER_ERR})
    }
}

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

const putAuthorByIdHandler = async (req, res) => {
    const authorId = req.params.id;
    const author = req.body; 
    try {
        //empty fields
        if(!author){
            return res.status(400).json({message: BAD_REQ});
        }
        //check invalid date
        if(author.birthYear && !isoRegex.test(author.birthYear)){
            return res.status(400).json({message: BAD_REQ});
        }

        const updatedAuthor = await updateAuthorById(authorId, author);
        //author not found
        if(updatedAuthor && updatedAuthor.matchedCount === 0){
            return res.status(404).json({message: NOT_FOUND});
        }
        //success
        return res.status(200).json(author);
    } catch (error) {
        //Internal Server Error
        console.error("Error", error.message);
        return res.status(500).json({message: SERVER_ERR});
    }
}

const deleteAuthorByIdHandler = async (req, res) => {
    const authorId = req.params.id;
    try {
        const {deletedCount} = await deleteAuthorById(authorId);
        
        //author not found
        if(deletedCount === 0){
            return res.status(404).json({message: NOT_FOUND});
        }
        
        //success
        return res.status(204).json();
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({message: SERVER_ERR});
    }
}

export { getAuthorsHandler, getAuthorByIdHander, 
    postAuthorHandler, putAuthorByIdHandler,
    deleteAuthorByIdHandler
};