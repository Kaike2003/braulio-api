import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { prisma } from '../../../prisma/prisma';

interface TokenPlayload {
    id: string
    iat: number
    exp: number
}

export default class PermissionRoutes {

    public async permission(typeuser: string) {

        return async (req: Request, res: Response, next: NextFunction) => {

            const segredo = "process.env.SECRET_JWT"
            const { authorization } = req.headers

            if (!authorization) {
                res.status(401).json(`Authorization está nulo`)
            } else {
                const token = authorization?.replace("Bearer", "").trim()
                try {

                    const data_token = jwt.verify(token, segredo)
                    const { id } = data_token as TokenPlayload
                    const cargo = await prisma.user.findUnique({
                        where: {
                            id: id
                        }
                    })

                    if (!cargo) {
                        res.status(400).json(`O cargo nao deve ser nulo.`)
                    } else {
                        if (cargo.id === id && typeuser === "user") {
                            next()
                        } else {
                            res.status(403).json(`Acesso negado`)
                        }
                    }
                } catch (error) {
                    res.status(400).json(error)
                }
            }
        }

    }





}