const router = require("express").Router();

const booksService = require("../services/booksService");
const { getErrorMessage } = require("../utils/errorUtils");
const { isAuth } = require("../middlewares/authMiddeware");

router.get("/", async (req, res) => {
  const books = await booksService.getAll().lean();
  res.json(books);
});

router.post("/create", isAuth, async (req, res) => {
  const bookData = req.body;
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    await booksService.create(req.user._id, bookData);
    res.json(req.body);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q
  try {
    const data = await booksService.search(query)
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
  
})

router.get("/:booksId/edit", isAuth,  isBooksOwner, async (req, res) => {
  const booksData = req.body;

  try {
    const editedBook = await booksService.update(req.params.booksId, booksData);
    res.json(editedBook); 
  } catch(err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }

});

router.post("/:booksId/update", isAuth,  isBooksOwner, async (req, res) => {
  const booksData = req.body;

  try {
    const editedBook = await booksService.update(req.params.booksId, booksData);
    res.json(editedBook); 
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/:booksId/details", async (req, res) => {
  try {
    const books = await booksService.getOneDetailed(req.params.booksId).lean();
    const isOwner = books?.owner && books?.owner._id == req.user?._id;
    res.json({ ...books, isOwner });
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }

});

router.get("/:booksId/delete", isAuth , isBooksOwner, async (req, res) => {
  try {
    const books = await booksService.delete(req.params.booksId);
    res.json(books); 
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

async function isBooksOwner(req, res, next) {
  const books = await booksService.getOneDetailed(req.params.booksId).lean();

  if (books?.owner?._id != req.user?._id) {
    return res.status(401).json({ error: "Unauthorized owner" });
  }
  next();
};

module.exports = router;