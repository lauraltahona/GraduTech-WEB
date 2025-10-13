import z from 'zod';

 const proyectSchema = z.object({
    title: z.string().max(150, {message: 'El título no puede exceder 150 caracteres'})
        .regex(/^[^\d]+$/, { message: 'No se permiten números en este campo' }),
    tipo: z.string(),
    rutaDocumento: z.string(),
    idEstudiante: z.string()
            .min(8, {invalid_type_error: 'la cedula debe tener al menos 8 numeros'})
            .max(10, {invalid_type_error: 'la cedula solo debe contener 10 numeros'})
            .regex(/^\d+$/, { message: 'La cédula debe contener solo números' }),
    idDocente: z.number().int().optional(),
    idJurado: z.number().int().optional(),
    descripcion: z.string().max(250, {message: 'descripción no puede exceder 250 caracteres'}).optional(),
    estado: z.string().optional(),
    autorizacion_repositorio: z.string().optional()

 })

 export function validateProyect(object){
    return proyectSchema.safeParse(object);
 }

export function validateUpdateProyect(object){
    return proyectSchema.partial().safeParse(object);
}