import { z } from "zod";
import { userSchema } from "./usuario.js";

 const juryDto = z.object({
    carrera: z.string({invalid_type_error: 'La carrera debe ser una cadena de texto'})
        .regex(/^[^\d]+$/, { message: 'No se permiten números en este campo' }),
    usuario: userSchema
});

export function validateJury(object){
    return juryDto.safeParse(object);
}