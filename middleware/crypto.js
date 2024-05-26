import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import crypto, { randomBytes } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const encryptFile = (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    const filePath = path.join(__dirname, '..', file.path);
    const encryptedFilePath = path.join(__dirname, '..', 'encrypted', file.filename);

    const algorithm = 'aes-256-cbc';
    const key = randomBytes(32);;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(encryptedFilePath);

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
        req.encryptedFilePath = encryptedFilePath;
        next();
    });

    output.on('error', (err) => {
        return res.status(500).send('Error encrypting file.');
    });
};

export default encryptFile;