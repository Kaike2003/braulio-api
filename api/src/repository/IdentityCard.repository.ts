
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";
import Password from "../utils/services/Password";
import IdentityCardDto from "../dto/IdentityCard.dto";
import { MaritalStatus, Sexo } from '@prisma/client';


export default class IdentityCardRepository {


    protected async createIdentityCardUser(req: Request, res: Response, identity: Omit<IdentityCardDto, "id" | "userId">) {

        const { datebirth, email, fathername, height, issuedon, maritalstatus, mathername, name, naturalfrom, province, residence, sexo, validuntil, cardnumber } = identity

        const status = MaritalStatus
        const sexo_status = Sexo

        const verifyDateidentityCard = validuntil.getFullYear() - issuedon.getFullYear()

        const verifyIdentityCard = await prisma.identityCard.findUnique({
            where: {
                cardnumber: cardnumber
            }
        })

        const verifyUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (verifyIdentityCard?.cardnumber === cardnumber) {
            res.status(400).json(`${cardnumber} codigo unico ja sendo usado...`)
        } else {

            if (verifyUser?.email === email) {

                if (issuedon < validuntil) {

                    if (verifyDateidentityCard >= 5) {

                        if (status.divorced === maritalstatus || status.married === maritalstatus || status.separate === maritalstatus || status.single === maritalstatus || status.widower === maritalstatus) {


                            if (sexo_status.masculine === sexo || sexo_status.feminino === sexo) {

                                const response = await prisma.identityCard.create({
                                    data: {
                                        cardnumber: cardnumber,
                                        datebirth: datebirth,
                                        fathername: fathername,
                                        height: height,
                                        issuedon: issuedon,
                                        maritalstatus: maritalstatus,
                                        mathername: mathername,
                                        name: name,
                                        naturalfrom: naturalfrom,
                                        province: province,
                                        residence: residence,
                                        userId: verifyUser.id,
                                        validuntil: validuntil,
                                        sexo: sexo
                                    }
                                })
                                    .then(async success => {
                                        res.status(201).json("Bilhete criado")
                                    })
                                    .catch(async error => {
                                        res.status(400).json(error)
                                    })


                            } else {
                                res.status(400).json(`Estado civil invalido ${maritalstatus}`)
                            }


                        } else {
                            res.status(400).json(`Estado civil invalido ${maritalstatus}`)
                        }

                    } else {
                        res.status(400).json(`Intervalo entre data emitidade e de expiracao: ${verifyDateidentityCard}`)
                    }

                } else {
                    res.status(400).json(`${issuedon} != ${validuntil}`)
                }

            } else {
                res.status(400).json(`${email} email não existe...`)
            }

        }




    }

    protected async updateIdentityCardUser(req: Request, res: Response, identity: Omit<IdentityCardDto, "userId" | "cardnumber">) {

        const { datebirth, email, fathername, height, issuedon, maritalstatus, mathername, name, naturalfrom, province, residence, sexo, validuntil, id } = identity

        const status = MaritalStatus
        const sexo_status = Sexo

        const verifyDateidentityCard = validuntil.getFullYear() - issuedon.getFullYear()

        const verifyIdentityCardId = await prisma.identityCard.findUnique({
            where: {
                id: id
            }
        })

        const verifyUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })


        if (verifyIdentityCardId?.id === id) {

            if (verifyUser?.email === email) {

                if (issuedon < validuntil) {

                    if (verifyDateidentityCard >= 5) {

                        if (status.divorced === maritalstatus || status.married === maritalstatus || status.separate === maritalstatus || status.single === maritalstatus || status.widower === maritalstatus) {


                            if (sexo_status.masculine === sexo || sexo_status.feminino === sexo) {

                                const response = await prisma.identityCard.update({
                                    where: {
                                        id: id
                                    },
                                    data: {
                                        datebirth: datebirth,
                                        fathername: fathername,
                                        height: height,
                                        issuedon: issuedon,
                                        maritalstatus: maritalstatus,
                                        mathername: mathername,
                                        name: name,
                                        naturalfrom: naturalfrom,
                                        province: province,
                                        residence: residence,
                                        userId: verifyUser.id,
                                        validuntil: validuntil,
                                        sexo: sexo
                                    }
                                })
                                    .then(async success => {
                                        res.status(201).json("Bilhete atualizado")
                                    })
                                    .catch(async error => {
                                        res.status(400).json(error)
                                    })


                            } else {
                                res.status(400).json(`Estado civil invalido ${maritalstatus}`)
                            }


                        } else {
                            res.status(400).json(`Estado civil invalido ${maritalstatus}`)
                        }

                    } else {
                        res.status(400).json(`Intervalo entre data emitidade e de expiracao: ${verifyDateidentityCard}`)
                    }

                } else {
                    res.status(400).json(`${issuedon} != ${validuntil}`)
                }

            } else {
                res.status(400).json(`${email} email não existe...`)
            }

        } else {
            res.status(400).json(`Id ${id} invalido...`)
        }







    }

    protected async updateCardNumberUser(req: Request, res: Response, identity: Pick<IdentityCardDto, "id" | "cardnumber">) {

        const { cardnumber, id } = identity

        const verifyCardNumberId = await prisma.identityCard.findUnique({
            where: {
                id: id
            }
        })

        const verifyCardNumber = await prisma.identityCard.findUnique({
            where: {
                cardnumber: cardnumber
            }
        })


        if (verifyCardNumberId?.id === id) {

            if (verifyCardNumber?.cardnumber === cardnumber) {
                res.status(400).json(`O numero de indetificacao desse bilhete ja esta sendo usado ${cardnumber}`)
            } else {

                const response = await prisma.identityCard.update({
                    where: {
                        id: id
                    },
                    data: {
                        cardnumber: cardnumber
                    },
                    select: {
                        cardnumber: true
                    }
                })
                    .then(async success => {
                        res.status(201).json("Bilhete atualizado")
                    })
                    .catch(async error => {
                        res.status(400).json(error)
                    })

            }


        } else {
            res.status(400).json(`Id ${id} invalido`)
        }

    }


}