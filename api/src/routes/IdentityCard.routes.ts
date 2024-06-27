import { Router } from "express";
import UserController from "../controllers/User.controller";
import IdentityCardController from "../controllers/IdentityCard.controller";
import PermissionRoutes from "../utils/services/PermissionRoutes";


export default class IdentityCardRoutes extends IdentityCardController {


    identityCardRoutes = Router()

    constructor() {
        super()
        this.allIdentityRoutes()
    }

    private async allIdentityRoutes() {

        const permission = await new PermissionRoutes().permission("user")

        this.identityCardRoutes
            .patch("/", permission, super.createIdentityCard)
            .patch("/update", permission, super.updateIdentityCard)
            .patch("/cardenumber/:id", permission, super.updateCardnumber)
            .get("/:email", permission, super.getIndentity)



    }


}