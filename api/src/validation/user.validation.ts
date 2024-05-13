import { z } from "zod"


const SchemaUser = z.object({
    id: z.string()
        .min(30)
        .max(40),
    username: z.string()
        .min(3)
        .max(45),
    email: z.string()
        .email(),
    password: z.string(),
    phone1: z.number()
        .min(900000000)
        .max(999999999),
    phone2: z.number()
        .min(900000000)
        .max(999999999),
    idPhone: z.string()
        .min(30)
        .max(40),
})

export const SchemaUserCreate = SchemaUser.omit({ id: true })
export const SchemaUserDelete = SchemaUser.pick({ email: true })
export const SchemaUserUpdateBasic = SchemaUser.omit({ email: true, phone1: true, phone2: true, idPhone: true })
export const SchemaUserUpdateEmail = SchemaUser.pick({ id: true, email: true })
export const SchemaUserFindUnique = SchemaUser.pick({ email: true })
export const SchemaUserLogin = SchemaUser.pick({ email: true, password: true })
export const SchemaUserPhoneUpdate = SchemaUser.pick({ id: true, phone1: true, phone2: true, idPhone: true })


export type TSchemaUserCreate = z.infer<typeof SchemaUserCreate>
export type TSchemaUserDelete = z.infer<typeof SchemaUserDelete>
export type TSchemaUserUpdateEmail = z.infer<typeof SchemaUserUpdateEmail>
export type TSchemaUserUpdateBasic = z.infer<typeof SchemaUserUpdateBasic>
export type TSchemaUserFindUnique = z.infer<typeof SchemaUserFindUnique>
export type TSchemaUserLogin = z.infer<typeof SchemaUserLogin>
export type TSchemaUserPhoneUpdate = z.infer<typeof SchemaUserPhoneUpdate>


