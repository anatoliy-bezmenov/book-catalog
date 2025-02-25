const router = require("express").Router();

const authController = require("./controllers/authController");
const booksController = require("./controllers/booksController");

router.use("/auth", authController);
router.use("/books", booksController);

router.all("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

module.exports = router;