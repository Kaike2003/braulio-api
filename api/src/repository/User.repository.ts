import { Request, Response } from "express";
import UserDto from "../dto/User.dto";
import { prisma } from "../../prisma/prisma";
import Passowrd from "../utils/services/Password";


export default class UserRepository extends Passowrd {

    constructor() {
        super()
    }

    protected async createUser(req: Request, res: Response, user: Omit<UserDto, "id">) {

        const { email, password, username, phone1, phone2 } = user

        const verifyEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (verifyEmail?.email === email) {
            res.status(400).json(`Já existe um utilizador usando esse ${email} na aplicação.`)
        } else {

            super.VerifyLevel(password)
                .then(async successLevel => {

                    if (successLevel >= 0 && successLevel <= 2) {
                        res.status(400).json(`Password ${password} é muito insegura`)
                    } else {

                        const response = await prisma.user.create({
                            data: {
                                username: username,
                                email: email,
                                password: await super.Encrypt(password),
                                Phone: {
                                    create: {
                                        phone1: phone1,
                                        phone2: phone2
                                    }
                                }
                            },
                            select: {
                                id: false,
                                email: true,
                                password: false,
                                username: true,
                                Phone: {
                                    select: {
                                        phone1: true,
                                        phone2: true
                                    }
                                }
                            }
                        })
                            .then(async success => {
                                res.status(201).json(success)
                            })
                            .catch(async error => {
                                res.status(400).json(error)
                            })

                    }

                })

        }

    }

    protected async updateUserBasic(req: Request, res: Response, user: Pick<UserDto, "id" | "password" | "username">) {

        const { id, password, username } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.id === id) {



            super.VerifyLevel(password)
                .then(async successLevel => {

                    if (successLevel >= 0 && successLevel <= 2) {
                        res.status(400).json(`Password ${password} é muito insegura`)
                    } else {

                        const response = await prisma.user.update({
                            where: {
                                id: id
                            },
                            data: {
                                username: username,
                                password: await super.Encrypt(password)
                            },
                            select: {
                                id: false,
                                email: true,
                                password: false,
                                username: true
                            }
                        })
                            .then(async success => {
                                res.status(201).json(success)
                            })
                            .catch(async error => {
                                res.status(400).json(error)
                            })

                    }

                })

        } else {
            res.status(400).json(`O id usuario está ${id} não existe...`)
        }

    }

    protected async updateUserEmail(req: Request, res: Response, user: Pick<UserDto, "id" | "email">) {

        const { id, email } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (verifyUser?.email === email) {
            res.status(400).json(`O email ${email} já está sendo usado na aplicacao`)
        } else {

            const response = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    email: email
                },
                select: {
                    id: false,
                    username: true,
                    email: true
                }
            })
                .then(async success => {
                    res.status(200).json(success)
                })
                .catch(async error => {
                    res.status(400).json(error)
                })

        }




    }

    protected async updatePhoneUser(req: Request, res: Response, user: Pick<UserDto, "id" | "phone1" | "phone2" | "idPhone">) {

        const { id, phone1, phone2, idPhone } = user


        const verifyUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        const verifyPhone = await prisma.phone.findUnique({
            where: {
                id: idPhone
            }
        })

        if (verifyUser?.id === id) {

            if (verifyPhone?.id === idPhone) {


                const response = await prisma.phone.update({
                    where: {
                        id: idPhone,
                        userId: id
                    },
                    data: {
                        phone1: phone1,
                        phone2: phone2
                    },
                    select: {
                        id: false,
                        phone1: true,
                        phone2: true
                    }
                })
                    .then(async success => {
                        res.status(200).json(success)
                    })
                    .catch(async error => {
                        res.status(400).json(error)
                    })


            } else {
                res.status(400).json(`O id do phone está inválido ${idPhone}`)
            }

        } else {
            res.status(400).json(`O id do usuario está inválido ${id}`)
        }

    }

    protected async createIdentityCardUser(req: Request, res: Response, user: Pick<UserDto, 'email'>) {

    }


}