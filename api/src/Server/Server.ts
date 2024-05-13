import express, { Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import UserRoutes from "../routes/User.routes"
import IdentityCardRoutes from "../routes/IdentityCard.routes"

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
            .use("/user", new UserRoutes().userRoutes)
            .use("/identityCard", new IdentityCardRoutes().identityCardRoutes)

    }


    public listen(value: number) {
        this.express.listen(value, () => {
            console.log(`Servidor funcionando na porta ${value}`)
        })
    }


}