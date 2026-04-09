const mongoose =  require('mongoose');

const bookSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.Mixed,
      default: () => new mongoose.Types.ObjectId(),
    },
    title: {
        type: String,
        required: true,
    },
    description:  {
        type: String,
        required: true,
    },
    category:  {
        type: String,
        required: true,
    },
    trending: {
        type: Boolean,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  }, {
    timestamps: true,
    _id: false,
  });

  const Book = mongoose.model('Book', bookSchema);

  module.exports = Book;