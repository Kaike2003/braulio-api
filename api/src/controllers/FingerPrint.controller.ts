import { Request, Response } from "express"
import FingerPrintRepository from "../repository/FingerPrint.repository"
import { SchemaFingerPrintCreate, SchemaFingerPrintVerify, TSchemaFingerPrintCreate, TSchemaFingerPrintVerify } from "../validation/fingerPrint.validation"


export default class FingerPrintController extends FingerPrintRepository {

    constructor() {
        super()
    }

    protected async createFingerPrint(req: Request, res: Response) {

        const { email, id }: TSchemaFingerPrintCreate = req.body

        SchemaFingerPrintCreate.parseAsync({
            email: email,
            id: id
        })
            .then(async success => {
                return await super.createFingerPrintUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

    protected async verifyFingerPrint(req: Request, res: Response) {

        const { id } = req.params

        SchemaFingerPrintVerify.parseAsync({
            id: id
        })
            .then(async success => {
                return await super.verifyFingerPrintUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

}