import { uploadFileService } from '../service/file-service.js';

export class uploadFileController {
    
    static async upload(req, res) {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No se envió ningún archivo' });
        }

        const file = req.files.file;

        uploadFileService(file)
        .then((fileUrl) => {
            res.status(200).json({
                message: `Archivo ${file.name} subido correctamente al servidor`,
                fileUrl,
            });
        })
        .catch((error) => {
            console.error('Error al subir archivo:', error);
            res.status(500).json({ message: 'Error al subir el archivo' });
        });
    }
}