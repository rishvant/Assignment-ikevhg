import express from "express";
import fs from "fs";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectDB from "./db/index.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

if (!fs.existsSync('encrypted')) {
  fs.mkdirSync('encrypted');
}

app.use(uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});