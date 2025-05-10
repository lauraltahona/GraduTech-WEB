import z from 'zod';

export const userSchema = z.object({
    nombre: z.string().min(3, { message: 'El nombre es obligatorio' }),
    correo: z.string().email({ message: 'Correo no válido' }),
    contraseña: z.string().min(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
})

