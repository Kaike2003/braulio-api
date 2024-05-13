import { z } from "zod"



const SchemaFingerPrint = z.object({
    id: z.string(),
    email: z.string()
        .email()
})

export const SchemaFingerPrintCreate = SchemaFingerPrint
export const SchemaFingerPrintVerify = SchemaFingerPrint.pick({ id: true })

export type TSchemaFingerPrintCreate = z.infer<typeof SchemaFingerPrint>
export type TSchemaFingerPrintVerify = z.infer<typeof SchemaFingerPrintVerify>
