import { Request, Response } from "express"
import { SchemaIdentityCardCreate, SchemaIdentityCardNumberUpdate, SchemaIdentityCardUpdate, SchemaIdentityFindAll, TSchemaIdentityCardCreate, TSchemaIdentityCardNumberUpdate, TSchemaIdentityCardUpdate } from "../validation/identityCard.validation"
import IdentityCardRepository from "../repository/IdentityCard.repository"


export default class IdentityCardController extends IdentityCardRepository {

    constructor() {
        super()
    }

    protected async createIdentityCard(req: Request, res: Response) {

        const { datebirth, fathername, height, issuedon, maritalstatus, mathername, name, naturalfrom, province, residence, sexo, validuntil, email, cardnumber }: TSchemaIdentityCardCreate = req.body

        SchemaIdentityCardCreate.parseAsync({
            email: email,
            datebirth: new Date(datebirth),
            fathername: fathername,
            height: Number(height),
            issuedon: new Date(issuedon),
            maritalstatus: maritalstatus,
            mathername: mathername,
            name: name,
            naturalfrom: naturalfrom,
            province: province,
            residence: residence,
            sexo: sexo,
            validuntil: new Date(validuntil),
            cardnumber: cardnumber
        })
            .then(async success => {
                return await super.createIdentityCardUser(req, res, success)
            })
            .catch(async error => {
                res.status(201).json(error)
            })

    }

    protected async updateIdentityCard(req: Request, res: Response) {

        const { datebirth, fathername, height, issuedon, maritalstatus, mathername, name, naturalfrom, province, residence, sexo, validuntil, email }: TSchemaIdentityCardUpdate = req.body

        SchemaIdentityCardUpdate.parseAsync({
            email: email,
            datebirth: new Date(datebirth),
            fathername: fathername,
            height: Number(height),
            issuedon: new Date(issuedon),
            maritalstatus: maritalstatus,
            mathername: mathername,
            name: name,
            naturalfrom: naturalfrom,
            province: province,
            residence: residence,
            sexo: sexo,
            validuntil: new Date(validuntil),
        })
            .then(async success => {
                return await super.updateIdentityCardUser(req, res, success)
            })
            .catch(async error => {
                res.status(201).json(error)
            })

    }

    protected async updateCardnumber(req: Request, res: Response) {

        const { id } = req.params
        const { cardnumber }: TSchemaIdentityCardNumberUpdate = req.body

        SchemaIdentityCardNumberUpdate.parseAsync({
            id: id,
            cardnumber: cardnumber
        })
            .then(async success => {
                return await super.updateCardNumberUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

    protected async getIndentity(req: Request, res: Response) {

        const { email } = req.params

        SchemaIdentityFindAll.parseAsync({
            email: email
        })
            .then(async success => {
                return await super.getIdentityCardeUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

}