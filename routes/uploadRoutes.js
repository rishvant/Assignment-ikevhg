import express from "express";
import { uploadController } from "../controllers/uploadFile.js";
import { upload } from "../middleware/multer.js";
import encryptFile from "../middleware/crypto.js";

const router = express.Router();

router.get("/api/upload/:filename", uploadController.getFile);
router.post("/api/upload", upload.single("file"), encryptFile, uploadController.uploadFile);

export default router;