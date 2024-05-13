import { Router } from "express";
import FingerPrintController from "../controllers/FingerPrint.controller";
import PermissionRoutes from "../utils/services/PermissionRoutes";


export default class FingerPrintroutes extends FingerPrintController {


    fingerPrintRoutes = Router()

    constructor() {
        super()
        this.allFingerPrintRoutes()
    }

    private async allFingerPrintRoutes() {

        const permission = await new PermissionRoutes().permission("user")


        this.fingerPrintRoutes
            .post("/", super.createFingerPrint)
            .get("/:id", super.verifyFingerPrint)

    }


}