import { z } from "zod"


const SchemaUser = z.object({
    id: z.string()
        .min(30)
        .max(35),
    username: z.string()
        .min(3)
        .max(45),
    email: z.string()
        .email()
})