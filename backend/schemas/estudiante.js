import z from 'zod';
import { userSchema } from './usuario.js';

const studentSchema = z.object({
    id_estudiante: z.string()
        .min(8, {invalid_type_error: 'La cedula debe contener al menos 8 digitos'})
        .max(10, {invalid_type_error: 'La cedula no puede tener más de 10 digitos'})
        .regex(/^\d+$/, { message: 'La cédula debe contener solo números' }),
    carrera: z.string({invalid_type_error: 'La carrera debe ser una cadena de texto'})
        .regex(/^[^\d]+$/, { message: 'No se permiten números en este campo' }),
    semestre: z.number({invalid_type_error: 'el semestre debe ser un numero'})
        .int({invalid_type_error: 'el semestre debe ser un número entero'}).min(1),
    usuario: userSchema
})

export function validateStudent(object){
    return studentSchema.safeParse(object);
}

export function validateStudentPartial(object){
    return studentSchema.partial().safeParse(object);
}