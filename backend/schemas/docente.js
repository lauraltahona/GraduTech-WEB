import z from 'zod';
import { userSchema } from './usuario.js';

const teacherSchema = z.object({
    id_docente: z.string()
        .min(8, {invalid_type_error: 'la cedula debe tener al menos 8 numeros'})
        .max(10, {invalid_type_error: 'la cedula solo debe contener 10 numeros'}),
    profesion: z.string().max(50, {invalid_type_error: 'el titulo no puede exceder 50 caracteres'}),
    disponibilidad: z.enum(['DISPONIBLE', 'NO DISPONIBLE'], {invalid_type_error: 'La disponibilidad debe ser "DISPONIBLE" o "NO DISPONIBLE"'}),
    usuario: userSchema
})

export function validateTeacher(object){
    return teacherSchema.safeParse(object);
}

export function validatePartialTeacher(object){
    return teacherSchema.partial().safeParse(object);
}