import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  })
  .catch((err) => console.log("MongoDB connection FAILED! ", err));
