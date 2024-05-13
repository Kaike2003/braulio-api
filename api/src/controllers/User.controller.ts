import UserRepository from '../repository/User.repository';
import {
    SchemaUserCreate, TSchemaUserUpdateBasic, TSchemaUserCreate, SchemaUserUpdateBasic, SchemaUserUpdateEmail, TSchemaUserUpdateEmail, TSchemaUserPhoneUpdate, SchemaUserPhoneUpdate,
    TSchemaUserLogin,
    SchemaUserLogin
} from './../validation/user.validation';
import { Request, Response } from "express";



export default class UserController extends UserRepository {

    constructor() {
        super()
    }

    protected async login(req: Request, res: Response) {

        const { email, password }: TSchemaUserLogin = req.body

        SchemaUserLogin.parseAsync({
            email: email,
            password: password
        })
            .then(async success => {
                return await super.loginUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })

    }

    protected async create(req: Request, res: Response) {

        const { email, password, username, phone1, phone2 }: TSchemaUserCreate = req.body

        SchemaUserCreate.parseAsync({
            email: email,
            password: password,
            username: username,
            phone1: Number(phone1),
            phone2: Number(phone2),
        })
            .then(async success => {
                return await super.createUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

    protected async updateBasic(req: Request, res: Response) {

        const { id } = req.params
        const { password, username }: TSchemaUserUpdateBasic = req.body

        SchemaUserUpdateBasic.parseAsync({
            id: id,
            password: password,
            username: username
        })
            .then(async success => {
                return await super.updateUserBasic(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

    protected async updateEmail(req: Request, res: Response) {

        const { id } = req.params
        const { email }: TSchemaUserUpdateEmail = req.body

        SchemaUserUpdateEmail.parseAsync({
            id: id,
            email: email,
        })
            .then(async success => {
                return await super.updateUserEmail(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

    protected async updatePhone(req: Request, res: Response) {

        const { id, idPhone } = req.params
        const { phone1, phone2 }: TSchemaUserPhoneUpdate = req.body

        SchemaUserPhoneUpdate.parseAsync({
            id: id,
            phone1: phone1,
            phone2: phone2,
            idPhone: idPhone
        })
            .then(async success => {
                return await super.updatePhoneUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

    protected async findAll(req: Request, res: Response) {

        return await super.findAllUser(req, res)

    }



}