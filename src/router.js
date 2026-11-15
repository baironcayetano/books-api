import { Router } from "express";
import { deleteBookByIdHandler, getBookByIdHandler, getBooksHandler, postBooksHandler, putBookByIdHandler } from "./controllers/books.js";

const router = Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Unable to retrieve books
 */
router.get("/books", getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *  get:
 *	  summary: Get one book by id
 *	  tags:
 *	    - Books
 *	  parameters:
 *	    - in: path
 *	      name: id
 *	      required: true
 *	      description: The custom book id, such as b1
 *	      schema:
 *	      type: string
 *	  responses:
 *	    200:
 *	      description: Book returned successfully
 *	    404:
 *	      description: Book not found
 *	    500:
 *	      description: Unable to retrieve book
 */
router.get("/books/:id", getBookByIdHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "2020-05-14"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid Format, Duplicated Book id or AuthorId references an author that does not exist.
 *       500:
 *         description: Unexpected Server Error
 */
router.post("/books", postBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
 *     parameters:
 *	     - in: path
 *	       name: id
 *	       required: true
 *	       description: The custom book id, such as b1
 *	       schema:
 *	       type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "2020-05-14"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid Format or AuthorId references an author that does not exist.
 *       500:
 *         description: Unexpected Server Error
 */
router.put("/books/:id", putBookByIdHandler);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id of the book to delete
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: No book exists with that id
 *       500:
 *         description: Unexpected Server Error
 */
router.delete("/books/:id", deleteBookByIdHandler);
export default router;
