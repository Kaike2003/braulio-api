import UserRepository from '../repository/User.repository';
import {
    SchemaUserCreate, TSchemaUserUpdateBasic, TSchemaUserCreate, SchemaUserUpdateBasic, SchemaUserUpdateEmail, TSchemaUserUpdateEmail, TSchemaUserPhoneUpdate, SchemaUserPhoneUpdate,
    TSchemaUserLogin,
    SchemaUserLogin,
    SchemaUserFindUnique,
    SchemaPasswordUpdate,
    TSchemaPasswordUpdate
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

        const { email, idPhone } = req.params
        const { username, phone1, phone2 }: TSchemaUserUpdateBasic = req.body

        SchemaUserUpdateBasic.parseAsync({
            idPhone: idPhone,
            email: email,
            phone1: phone1,
            phone2: phone2,
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

    protected async updatePassword(req: Request, res: Response) {

        const { email } = req.params
        const { oldpassword, passwordactually }: TSchemaPasswordUpdate = req.body


        SchemaPasswordUpdate.parseAsync({
            email: email,
            oldpassword: oldpassword,
            passwordactually: passwordactually
        })
            .then(async success => {
                return await super.UpdatePasswordUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })
    }

    protected async findUnique(req: Request, res: Response) {

        const { email } = req.params

        SchemaUserFindUnique.parseAsync({
            email
        })
            .then(async success => {
                return await super.findUniqueUser(req, res, success)
            })
            .catch(async error => {
                res.status(400).json(error)
            })


    }



}