import { Request, Response } from "express";
import UserDto from "../dto/User.dto";
import { prisma } from "../../prisma/prisma";
import Passowrd from "../utils/services/Password";
import Jwt from "../utils/services/Jwt";
import { User } from "@prisma/client";
import { PasswordDto } from "../dto/Password.dto";


export default class UserRepository extends Passowrd {

    constructor() {
        super()
    }

    protected async loginUser(req: Request, res: Response, user: Pick<UserDto, "password" | "email">) {

        const { email, password } = user

        const verifyEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })


        if (verifyEmail?.email === email) {

            const dbpassword = verifyEmail.password

            if (dbpassword === null) {
                res.status(400).json(`Db password${dbpassword}`)
            } else {

                const passwordcorrect = await super.ComparePassword(password, dbpassword)

                if (passwordcorrect === true) {

                    const logged = new Jwt().token_sign(verifyEmail.id)

                    res.status(200).json(logged)

                } else {
                    res.status(400).json(`A sua palavra passe está incorreta.`)
                }

            }



        } else {
            res.status(400).json(`Email ${email} invalido`)
        }


    }

    protected async createUser(req: Request, res: Response, user: Omit<UserDto, "id" | "idPhone">) {

        const { email, password, username, phone1, phone2 } = user

        const verifyEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })



        if (verifyEmail?.created === true) {
            res.status(400).json(`Só podes ter um bilhete na aplicação`)
        } else {

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
                                    res.status(201).json("Conta criada")
                                })
                                .catch(async error => {
                                    res.status(400).json(error)
                                })

                        }

                    })

            }

        }



    }

    protected async updateUserBasic(req: Request, res: Response, user: Omit<UserDto, "id" | "password">) {

        const { email, idPhone, phone1, phone2, username } = user

        const verifyUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        const verifyPhone = await prisma.phone.findUnique({
            where: {
                id: idPhone
            }
        })

        if (verifyUser?.email === email) {

            if (verifyPhone?.id === idPhone) {

                const response = await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        username: username,
                        password: verifyUser.password,
                        Phone: {
                            update: {
                                where: {
                                    id: idPhone,
                                },
                                data: {
                                    phone1: phone1,
                                    phone2: phone2
                                }
                            }
                        }
                    },
                    select: {
                        id: false,
                        email: true,
                        password: false,
                        username: true
                    }
                })
                    .then(async success => {
                        res.status(201).json("Informações atualizadas")
                    })
                    .catch(async error => {
                        res.status(400).json(error)
                    })


            } else {
                res.status(400).json(`O id ${idPhone} esta invlaido`)

            }



        } else {
            res.status(400).json(`O id usuario está ${email} não existe...`)
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
                }
            })
                .then(async success => {
                    res.status(200).json("Email atualizado")
                })
                .catch(async error => {
                    res.status(400).json(error)
                })

        }




    }

    protected async UpdatePasswordUser(req: Request, res: Response, user: PasswordDto) {

        const { email, passwordactually, oldpassword } = user


        const verifyUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (verifyUser?.email === email) {

            const dbpassword = verifyUser?.password

            if (dbpassword === null) {
                res.status(400).json(`Db password${dbpassword}`)
            } else {


                const verifypassword = await super.ComparePassword(oldpassword, dbpassword)

                console.log(verifypassword)

                if (verifypassword === true) {


                    super.VerifyLevel(passwordactually)
                        .then(async successLevel => {

                            if (successLevel >= 0 && successLevel <= 2) {
                                res.status(400).json(`Password ${passwordactually} é muito insegura`)
                            } else {

                                const response = await prisma.user.update({
                                    where: {
                                        email: email,
                                    },
                                    data: {
                                        password: await super.Encrypt(passwordactually)
                                    }
                                })
                                    .then(async success => {
                                        res.status(200).json("Password updated")
                                    })
                                    .catch(async error => {
                                        res.status(400).json(error)
                                    })

                            }

                        })



                } else {
                    res.status(400).json(`A sua palavra passe está incorreta.`)
                }

            }


        } else {
            res.status(400).json(`O email do usuario está inválido ${email}`)
        }

    }

    protected async createIdentityCardUser(req: Request, res: Response, user: Pick<UserDto, 'email'>) {

    }

    protected async findUniqueUser(req: Request, res: Response, date: Pick<User, "email">) {

        const { email } = date

        const response = await prisma.user.findUnique({
            where: {
                email: String(email)
            }
        })

        return res.status(200).json(response)

    }


}