import z from 'zod';
export const userSchema = z.object({
    nombre: z.string().min(3, { message: 'El nombre es obligatorio' }),
    cedula: z.string()
            .min(8, {invalid_type_error: 'la cedula debe tener al menos 8 numeros'})
            .max(10, {invalid_type_error: 'la cedula solo debe contener 10 numeros'})
            .regex(/^\d+$/, { message: 'La cédula debe contener solo números' }),
    correo: z.string().email({ message: 'Correo no válido' }).min(6, {message: 'El user debe tener minimo 3 caracteres'}),
    password: z.string().min(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
})
