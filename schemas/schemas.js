import z from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;
const idSchema = z.string().regex(objectIdRegex);

export async function validateId({ id }) {
    return await idSchema.safeParseAsync(id);
}
