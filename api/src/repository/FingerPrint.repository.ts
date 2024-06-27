
import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma";
import FingerPrintDto from "../dto/FingerPrint.dto";

export default class FingerPrintRepository {

    protected async createFingerPrintUser(req: Request, res: Response, data: FingerPrintDto) {

        const { id, email } = data

        const verifyFingerPrint = await prisma.user.findUnique({
            where: {
                id: id,
            }
        })

        if (verifyFingerPrint?.id === id) {
            res.status(400).json("já existem um impressão digital nessa posição")
        } else {
            const response = await prisma.user.create({
                data: {
                    fingerprint: id,
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

        const verify = await prisma.user.findUnique({
            where: {
                fingerprint: id
            }
        })

        if (verify?.id === id) {

            const verifyUser = await prisma.user.findUnique({
                where: {
                    id: verify.id,
                },
                select: {
                    email: true,
                    username: true,
                    Phone: {
                        where: {
                            userId: verify.id
                        },
                        select: {
                            phone1: true,
                            phone2: true
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