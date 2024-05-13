import { Router } from "express";
import UserController from "../controllers/User.controller";


export default class UserRoutes extends UserController {

    userRoutes = Router()

    constructor() {
        super()
        this.allUserRoutes()
    }

    private allUserRoutes() {
        this.userRoutes
            .post("/", super.create)
            .patch("/:id", super.updateBasic)
            .patch("/email/:id", super.updateEmail)
            .patch("/phone/:id/:idPhone", super.updatePhone)

    }


}