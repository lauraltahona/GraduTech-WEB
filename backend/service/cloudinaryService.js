import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import path from 'path';

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

        // Obtener la extensión del archivo
        const extension = path.extname(file.name); 
        const baseName = path.basename(file.name, extension); 

        // Crear stream desde el buffer del archivo
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'gradutech_entregas',
                resource_type: isPdfOrDoc ? 'raw' : 'auto',
                use_filename: true,
                unique_filename: true,
                // CRÍTICO: Agregar la extensión al public_id
                public_id: `${baseName}_${Date.now()}${extension}`, // Incluye extensión
            },
            (error, result) => {
                if (error) {
                    console.error('❌ Error subiendo a Cloudinary:', error);
                    return reject(error);
                }

                console.log('✅ Archivo subido a Cloudinary');
                console.log('📎 URL completa:', result.secure_url);
                console.log('📎 Public ID:', result.public_id);

                // Retornar URL completa con extensión
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
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'raw' // Importante para archivos raw
        });
        return result;
    } catch (error) {
        console.error('Error eliminando de Cloudinary:', error);
        throw error;
    }
};
