const Books = require("../models/Books");
const User = require("../models/User");

exports.getOne = (booksId) => {
  return Books.findById(booksId);
};

exports.getOneDetailed = (booksId) => {
  return Books.findById(booksId).populate("owner");
};
// Get all Books
exports.getAll = () => {
  return Books.find();
};

exports.create = async (userId, booksData) => {
  const createdBook = await Books.create({
    owner: userId,
    ...booksData,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { createdBooks: createdBook._id },
  });

  return createdBook;
};

exports.update = (booksId, booksData) => {
  return Books.findByIdAndUpdate(booksId, booksData, { runValidators: true });
};

exports.delete = (booksId) => {
  return Books.findByIdAndDelete(booksId);
};

exports.search = (name) => {
  let query = {};

  if (name) {
    query.name = new RegExp(name, "i");
  }

  return Books.find(query);
};
