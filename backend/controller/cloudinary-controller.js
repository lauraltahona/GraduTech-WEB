
import { uploadToCloudinary } from '../service/cloudinaryService.js';

export const subirArchivoCloudinary = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
    }

    const file = req.files.file;

    const url = await uploadToCloudinary(file);

    return res.status(200).json({
      message: 'Archivo subido correctamente a Cloudinary',
      fileUrl: url,
    });
  } catch (error) {
    console.error('Error al subir archivo a Cloudinary:', error);
    return res.status(500).json({
      message: 'Error al subir archivo',
      error: error.message,
    });
  }
};
