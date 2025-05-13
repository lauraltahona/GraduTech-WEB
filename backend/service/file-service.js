import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads');

export const uploadFileService = (file) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }

        const filePath = path.join(uploadsPath, file.name);

        file.mv(filePath, (err) => {
            if (err) return reject(err);
            resolve(`/files/${file.name}`);
        });
    });
};
