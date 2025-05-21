export const validateDto = (schemaDto,object)=>{
    return schemaDto.safeParse(object)
}
