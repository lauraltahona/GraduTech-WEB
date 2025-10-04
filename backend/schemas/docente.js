import z from 'zod';
import { userSchema } from './usuario.js';

const teacherSchema = z.object({
    profesion: z.string().max(50, {message: 'el titulo no puede exceder 50 caracteres'}),
    carrera: z.string(50),
    usuario: userSchema
})

export function validateTeacher(object){
    return teacherSchema.safeParse(object);
}

export function validatePartialTeacher(object){
    return teacherSchema.partial().safeParse(object);
}