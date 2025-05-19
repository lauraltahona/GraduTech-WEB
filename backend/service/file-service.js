import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads');

export const uploadFileService = (file) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }

        // Obtener nombre y extensión
        const ext = path.extname(file.name);
        const baseName = path.basename(file.name, ext);

        // Limpiar el nombre del archivo (sin tildes, ñ, espacios, etc.)
        const safeName = slugify(baseName, {
            lower: true,
            remove: /[*+~.()'"!:@¿¡?¡%&#/\\]/g, // quita caracteres especiales
            strict: true
        });

        const finalName = `${safeName}${ext}`;
        const filePath = path.join(uploadsPath, finalName);

        file.mv(filePath, (err) => {
            if (err) return reject(err);

            // Retornar ruta pública accesible
            resolve(`/files/${finalName}`);
        });
    });
};
