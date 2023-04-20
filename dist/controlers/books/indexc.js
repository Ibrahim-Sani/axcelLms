"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.updateBookForm = exports.createBook = exports.createBokoForm = exports.bookDetails = exports.getAllBooks = exports.getHomePage = void 0;
const uuid_1 = require("uuid");
const indexU_1 = require("../../utils/users/indexU");
// C-O-N-T-R-O-L-E-R FUNCTION
//
//HOME PAGE
const getHomePage = (req, res, next) => {
    res.render("landingpage");
};
exports.getHomePage = getHomePage;
//FUNCTION FOR GET ALL BOOKS COMING FROM THE getAllData Function IN UTILITY
const getAllBooks = (req, res, next) => {
    const allBooks = (0, indexU_1.getAllData)("books.json");
    res.render("home", { checkings: allBooks });
};
exports.getAllBooks = getAllBooks;
const bookDetails = (req, res, next) => {
    const allBooks = (0, indexU_1.getAllData)("books.json");
    const id = req.body.bookID;
    const currentBook = allBooks.find((book) => book.id === id);
    res.render("videtails", { book: currentBook });
};
exports.bookDetails = bookDetails;
//FUNCTION FOR CREATING BOOKS COMING FROM THE creatData Function UTILITY
const createBokoForm = (req, res, next) => {
    res.render("createUser");
};
exports.createBokoForm = createBokoForm;
const createBook = (req, res, next) => {
    const allBooks = (0, indexU_1.getAllData)("books.json");
    const { title, author, datePublished, Description, pageCount, genre, publisher } = req.body;
    const existingBook = allBooks.find((e) => e.Title === title);
    if (existingBook) {
        return res.send({
            message: `Book with the title ${title} already exists`
        });
    }
    const newChunk = {
        "id": (0, uuid_1.v4)(),
        "Title": title,
        "Author": author,
        "datePublished": datePublished,
        "Description": Description,
        "pageCount": pageCount,
        "Genre": genre,
        "Publisher": publisher,
        "createdAt": new Date(),
        "updatedAt": new Date()
    };
    allBooks.push(newChunk);
    (0, indexU_1.creatData)("books.json", allBooks);
    res.redirect("/book/getAllBooks");
};
exports.createBook = createBook;
//FUNCTION FOR UPDATING BOOKS COMING FROM THE creatData Function IN UTILITY
const updateBookForm = (req, res, next) => {
    const allBooks = (0, indexU_1.getAllData)("books.json");
    const id = req.body.bookID;
    const currentBook = allBooks.find((book) => book.id === id);
    // console.log(currentBook);
    res.render("edithUser", { book: currentBook });
};
exports.updateBookForm = updateBookForm;
const updateBook = (req, res, next) => {
    try {
        const allBooks = (0, indexU_1.getAllData)("books.json");
        const id = req.body.bookID;
        // console.log(req.body);
        const existingBook = allBooks.find((book) => book.id === id);
        console.log({ existingBook, allBooks, id });
        if (!existingBook) {
            return res.send({
                message: `Book with the ID ${id} dose not exists`
            });
        }
        allBooks.forEach((book) => {
            if (book.id === id) {
                for (let fild in req.body) {
                    book[fild] = req.body[fild];
                }
                book.updatedAt = new Date();
            }
        });
        (0, indexU_1.creatData)("books.json", allBooks);
        res.redirect("/book/getAllBooks");
    }
    catch (error) {
        console.log("UpdateBookError", error);
    }
    // res.send(allBooks)
};
exports.updateBook = updateBook;
//FUNCTION FOR DELETING BOOKS COMING FROM THE creatData Function IN UTILITY
const deleteBook = (req, res, next) => {
    const allBooks = (0, indexU_1.getAllData)("books.json");
    const id = req.body.bookID;
    const existingBook = allBooks.find((book) => book.id === id);
    if (!existingBook) {
        return res.send({
            message: `Book with the ID ${id} dose not exists`
        });
    }
    const filteredBooks = allBooks.filter((e) => e.id !== id);
    (0, indexU_1.creatData)("books.json", filteredBooks);
    res.redirect("/book/getAllBooks");
};
exports.deleteBook = deleteBook;
