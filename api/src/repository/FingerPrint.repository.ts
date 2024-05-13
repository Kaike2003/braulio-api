
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";
import FingerPrintDto from "../dto/FingerPrint.dto";

export default class FingerPrintRepository {

    protected async createFingerPrintUser(req: Request, res: Response, data: FingerPrintDto) {

        const { id, email } = data

        const verifyFingerPrint = await prisma.fingerprint.findUnique({
            where: {
                id: id,
            }
        })

        if (verifyFingerPrint?.id === id) {
            res.status(400).json("já existem um impressão digital nessa posição")
        } else {
            const response = await prisma.fingerprint.create({
                data: {
                    id: id,
                    user: {
                        connect: {
                            email: email
                        }
                    }
                }
            })
                .then(async success => {
                    res.status(201).json("Impressão digital cadastrada")
                })
                .catch(async error => {
                    res.status(400).json(error)
                })
        }


    }

    protected async verifyFingerPrintUser(req: Request, res: Response, data: Pick<FingerPrintDto, "id">) {

        const { id } = data

        const verify = await prisma.fingerprint.findUnique({
            where: {
                id: id
            }
        })

        if (verify?.id === id) {

            const verifyUser = await prisma.user.findUnique({
                where: {
                    id: verify.userId,
                },
                select: {
                    email: true,
                    username: true,
                    Phone: {
                        where: {
                            userId: verify.userId
                        },
                        select: {
                            phone1: true,
                            phone2: true
                        }
                    },
                    IdentityCard: {
                        where:{
                            userId: verify.userId,
                        },
                        select:{
                            cardnumber: true,
                            datebirth: true,
                            fathername: true,
                            height: true,
                            issuedon: true,
                            maritalstatus: true,
                            mathername: true,
                            name: true,
                            naturalfrom: true,
                            province: true,
                            residence: true,
                            sexo: true
                        }
                    }
                }
            })
                .then(async success => {
                    res.status(200).json(success)
                })
                .catch(async error => {
                    res.status(error)
                })

        } else {
            res.status(400).json(`Id ${verify?.id} invalido`)
        }


    }



}