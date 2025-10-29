// services/cloudinaryUploadService.js
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    // Detectar tipo de archivo
    const isPdfOrDoc =
      file.name.endsWith('.pdf') ||
      file.name.endsWith('.doc') ||
      file.name.endsWith('.docx') ||
      file.name.endsWith('.zip');

    // Crear stream desde el buffer del archivo
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'gradutech_entregas',
        resource_type: isPdfOrDoc ? 'raw' : 'auto', // 🔹 cambia esto
        use_filename: true,
        unique_filename: true
      },
      (error, result) => {
        if (error) {
          console.error('Error subiendo a Cloudinary:', error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    const bufferStream = Readable.from(file.data);
    bufferStream.pipe(uploadStream);
  });
};


// Opcional: Función para eliminar archivos
export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error eliminando de Cloudinary:', error);
        throw error;
    }
};