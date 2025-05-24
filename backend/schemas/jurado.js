import { z } from "zod";
import { userSchema } from "./usuario.js";

 const juryDto = z.object({
    idJurado: z.string()
            .min(8, {invalid_type_error: 'La cedula debe contener al menos 8 digitos'})
            .max(10, {invalid_type_error: 'La cedula no puede tener más de 10 digitos'})
            .regex(/^\d+$/, { message: 'La cédula debe contener solo números' }),
    carrera: z.string({invalid_type_error: 'La carrera debe ser una cadena de texto'})
        .regex(/^[^\d]+$/, { message: 'No se permiten números en este campo' }),
    usuario: userSchema
});

export function validateJury(object){
    return juryDto.safeParse(object);
}