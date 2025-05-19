//DTOS
export const userSchema = z.object({
    nombre: z.string().min(3, { message: 'El nombre es obligatorio' }),
    correo: z.string().email({ message: 'Correo no válido' }).min(6, {message: 'El user debe tener minimo 3 caracteres'}),
    contraseña: z.string().min(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
})
