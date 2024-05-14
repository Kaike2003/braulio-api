import { z } from "zod"


const SchemaIdentityCard = z.object({
    id: z.string()
        .min(30).max(40),
    name: z.string()
        .min(3).max(40),
    fathername: z.string()
        .min(3).max(40),
    mathername: z.string()
        .min(3).max(40),
    residence: z.string()
        .min(3).max(40),
    naturalfrom: z.string()
        .min(3).max(40),
    province: z.string()
        .min(3).max(40),
    datebirth: z.date()
        .min(new Date("1590-01-01"))
        .max(new Date()),
    sexo: z.string()
        .min(3)
        .max(40),
    height: z.number()
        .min(1)
        .max(2),
    maritalstatus: z.string()
        .min(3)
        .max(10),
    issuedon: z.date()
        .min(new Date("1590-01-01")),
    validuntil: z.date()
        .min(new Date("1590-01-01")),
    userId: z.string()
        .min(3).max(40),
    email: z.string()
        .email(),
    cardnumber: z.string()
        .min(14)
        .max(14)
})

export const SchemaIdentityCardCreate = SchemaIdentityCard.omit({ id: true, userId: true })
export const SchemaIdentityCardUpdate = SchemaIdentityCard.omit({ userId: true, cardnumber: true })

export const SchemaIdentityCardNumberUpdate = SchemaIdentityCard.pick({ cardnumber: true, id: true })
export const SchemaIdentityFindAll = SchemaIdentityCard.pick({ email: true })

export type TSchemaIdentityCardCreate = z.infer<typeof SchemaIdentityCardCreate>
export type TSchemaIdentityCardUpdate = z.infer<typeof SchemaIdentityCardUpdate>
export type TSchemaIdentityCardNumberUpdate = z.infer<typeof SchemaIdentityCardNumberUpdate>
export type TSchemaIdentityFindAll = z.infer<typeof SchemaIdentityFindAll>

