const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./Routes/auth");
const private = require("./Routes/private");
const connectDB = require("./config/db");
const app = express();
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log("DATABASE CONNECTED WITH SUCCESS");
  })
  .catch((err) => {
    console.log("error", err);
  });

//allows us to read data from request body
app.use(express.json());
app.use(cors());

app.use("/api/auth/", routes);
app.use("/api/private/", private);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
