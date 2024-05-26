import path from "path";
import { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadController = {
    uploadFile: async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }

            const encryptedFilePath = req.encryptedFilePath;
            res.status(200).send(`File uploaded and encrypted at path: ${encryptedFilePath}`);
        }
        catch (err) {
            console.log("Error:", err);
        }
    },
    getFile: async (req, res) => {
        try {
            const filename = req.params.filename;
            const filePath = path.join(__dirname, 'encrypted', filename);

            if (fs.existsSync(filePath)) {
                res.download(filePath);
            } else {
                res.status(404).send('File not found.');
            }
        }
        catch (err) {
            console.log("Error:", err);
        }
    }
}