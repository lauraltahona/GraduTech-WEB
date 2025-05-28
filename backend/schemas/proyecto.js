import z from 'zod';

 const proyectSchema = z.object({
    title: z.string().max(250, {invalid_type_error: 'el titulo es muy largo'})
        .regex(/^[^\d]+$/, { message: 'No se permiten números en este campo' }),
    tipo: z.string(),
    rutaDocumento: z.string(),
    idEstudiante: z.string()
        .min(8, {invalid_type_error: 'La cedula debe contener al menos 8 digitos'})
        .max(10, {invalid_type_error: 'La cedula no puede tener más de 10 digitos'})
        .regex(/^\d+$/, { message: 'La cédula debe contener solo números' }),
    idDocente: z.string()
        .min(8, {invalid_type_error: 'La cedula debe contener al menos 8 digitos'})
        .max(10, {invalid_type_error: 'La cedula no puede tener más de 10 digitos'})
        .regex(/^\d+$/, { message: 'La cédula debe contener solo números' }).optional(),
    idJurado: z.string()
        .min(8, {invalid_type_error: 'La cedula debe contener al menos 8 digitos'})
        .max(10, {invalid_type_error: 'La cedula no puede tener más de 10 digitos'})
        .regex(/^\d+$/, { message: 'La cédula debe contener solo números' }).optional(),
    descripcion: z.string().optional(),
    estado: z.string().optional(),
    autorizacion_repositorio: z.string().optional()

 })

 export function validateProyect(object){
    return proyectSchema.safeParse(object);
 }