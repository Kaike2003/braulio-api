import { Router } from "express";
import UserController from "../controllers/User.controller";
import PermissionRoutes from "../utils/services/PermissionRoutes";


export default class UserRoutes extends UserController {

    userRoutes = Router()

    constructor() {
        super()
        this.allUserRoutes()
    }

    private async allUserRoutes() {

        const permission = await new PermissionRoutes().permission("user")

        this.userRoutes
            .post("/", super.create)
            .post("/login", super.login)
            .patch("/:email/:idPhone", permission, super.updateBasic)
            .put("/email/:id", permission, super.updateEmail)
            .put("/password/:email", permission, super.updatePassword)
            .get("/", super.findUnique)
    }

}