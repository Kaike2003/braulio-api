import { Router } from "express";
import UserController from "../controllers/User.controller";
import IdentityCardController from "../controllers/IdentityCard.controller";


export default class IdentityCardRoutes extends IdentityCardController {


    identityCardRoutes = Router()

    constructor() {
        super()
        this.allIdentityRoutes()
    }

    private allIdentityRoutes() {
        this.identityCardRoutes
            .post("/", super.createIdentityCard)
            .patch("/:id", super.updateIdentityCard)
    }


}