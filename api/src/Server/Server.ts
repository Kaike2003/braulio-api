import express, { Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"

export default class Server {

    private express: express.Application

    constructor() {
        this.express = express()
        this.middlewares()
    }

    private middlewares() {
        this.express
            .use(express.json())
            .use(cors())
            .use(morgan("dev"))
            .use(express.urlencoded())
            .get("/", (req: Request, res: Response) => {
                res.status(200).json("ok")
            })
    }


    public listen(value: number) {
        this.express.listen(value, () => {
            console.log(`Servidor funcionando na porta ${value}`)
        })
    }


}