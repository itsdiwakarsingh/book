const Book = require("./book.model");
const mongoose = require("mongoose");

const postABook = async (req, res) => {
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook})
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create book"})
    }
}

// get all books
const getAllBooks =  async (req, res) => {
    try {
        const books = await Book.find()
          .sort({ createdAt: -1 })
          .lean();
        return res.status(200).send(books)
        
    } catch (error) {
        console.error("Error fetching books", error);
        return res.status(500).send({message: "Failed to fetch books"})
    }
}

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const parsedId = /^\d+$/.test(String(id))
          ? Number(id)
          : mongoose.Types.ObjectId.isValid(String(id))
            ? new mongoose.Types.ObjectId(String(id))
            : id;
        const book =  await Book.findOne({ _id: parsedId }).lean();
        if(!book){
            return res.status(404).send({message: "Book not Found!"})
        }
        return res.status(200).send(book)
        
    } catch (error) {
        console.error("Error fetching book", error);
        return res.status(500).send({message: "Failed to fetch book"})
    }

}

// update book data
const UpdateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const parsedId = /^\d+$/.test(String(id))
          ? Number(id)
          : mongoose.Types.ObjectId.isValid(String(id))
            ? new mongoose.Types.ObjectId(String(id))
            : id;
        const updatedBook =  await Book.findOneAndUpdate({ _id: parsedId }, req.body, {new: true});
        if(!updatedBook) {
            return res.status(404).send({message: "Book is not Found!"})
        }
        return res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a book", error);
        return res.status(500).send({message: "Failed to update a book"})
    }
}

const deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const parsedId = /^\d+$/.test(String(id))
          ? Number(id)
          : mongoose.Types.ObjectId.isValid(String(id))
            ? new mongoose.Types.ObjectId(String(id))
            : id;
        const deletedBook =  await Book.findOneAndDelete({ _id: parsedId });
        if(!deletedBook) {
            return res.status(404).send({message: "Book is not Found!"})
        }
        return res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        return res.status(500).send({message: "Failed to delete a book"})
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
}