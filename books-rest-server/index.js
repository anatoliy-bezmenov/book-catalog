const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { authMiddleware } = require("./middlewares/authMiddeware");

const cors = require("cors");

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware);

app.use(routes);

mongoose
  .connect(`mongodb://127.0.0.1:27017/books`)
  .then(() => {
    console.log(`DB Connected`);
    // First wait for database to connect and then the server to connect after database is connected
    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log(`Cannot connect to DB`);
    console.log(err);
  });
