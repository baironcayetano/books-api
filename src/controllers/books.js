import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "../models/books.js";

const isoRegex = /^\d{4}-\d{2}-\d{2}$/;

//Error Messages
const BAD_REQ = "Bad request. Invalid Data";
const NOT_FOUND = "Book not found";
const SERVER_ERR = "Internal Server Error"; 

const postBooksHandler = async (req, res) => {
	try{
		const book = req.body;

		//[Validate book entries]
		if(!book.id || !book.authorId || !book.title || !book.publicationDate){
			return res.status(400).json({message: BAD_REQ})
		}
		//validate date
		if(!isoRegex.test(book.publicationDate)){
			return res.status(400).json({message: BAD_REQ})
		}

		await createBook(book);
		return res.status(201).json(book);

	}catch (error){
		//When errors are related to the form 
		//the message returned to the user should be simple
		//so that attackers don't get adventage or these response messages 
		switch (error.message) {
			case "duplicated custom id":
				return res.status(400).json({message: BAD_REQ});
			case "author does not exist":
				return res.status(400).json({message: BAD_REQ});
			//server errors
			default:
				//log error
				console.error("Failed to retreive books", error.message);
				return res.status(500).json({message: SERVER_ERR});
		}
	
		
	}
};

const getBooksHandler = async (req, res) => {
	try{
		const books = await getAllBooks();
		return res.status(200).json(books);
	}catch(error){
		console.error("Failed to retreive books: ", error.message);
		return res.status(500).json({message:SERVER_ERR});
	}	
};

const getBookByIdHandler = async (req, res) => {
	const bookId = req.params.id;

	try{
		const book = await getBookById(bookId);
		
		//Not found
		if(!book) return res.status(404).json({message: "Book not found"});

		return res.status(200).json(book);
	}catch(error){
		console.error("GET /books/:id failed:", error.message);
		return res.status(500).json({message:"Internal Server Error"});
	}
};

const putBookByIdHandler = async (req, res) => {
	const bookId = req.params.id;
	const book = req.body;
	try{
		//validate if the the book has at least one valid entry 
		if(!book.authorId && !book.title && !book.publicationDate){
			return res.status(400).json({message: BAD_REQ})
		}

		//validate date (if exists)
		if(book.publicationDate && !isoRegex.test(book.publicationDate)){
			return res.status(400).json({message: BAD_REQ})
		}

		const updatedBook = await updateBookById(bookId, book);
		if(updatedBook && updatedBook.matchedCount === 0){
			return res.status(404).json({ message: BAD_FOUND })
		}

		return res.status(200).json(book);

	}catch (error){
		//When errors are related to the form 
		//the message returned to the user should be simple
		//so that attackers don't get adventage or these response messages 
		if(error.message === "author does not exist"){
			return res.status(400).json({message: BAD_REQ}); 
		}
		
		console.error("Failed to retreive books", error.message);
		return res.status(500).json({message: SERVER_ERR});
	}
};

const deleteBookByIdHandler = async (req, res) => {
	const bookId = req.params.id;
	try {
		const deletedBook = await deleteBookById(bookId);
		
		if(deletedBook.deletedCount === 0){
			return res.status(404).json({message: NOT_FOUND});
		}

		return res.status(204).json();

	} catch (error) {
		console.error("Failed to retreive books", error.message);
		return res.status(500).json({message: SERVER_ERR});
	}
}

export { postBooksHandler, getBooksHandler, getBookByIdHandler, 
	putBookByIdHandler, deleteBookByIdHandler };
