import { Router } from "express";
import FingerPrintController from "../controllers/FingerPrint.controller";


export default class FingerPrintroutes extends FingerPrintController {


    fingerPrintRoutes = Router()

    constructor() {
        super()
        this.allFingerPrintRoutes()
    }

    private allFingerPrintRoutes() {
        this.fingerPrintRoutes
            .post("/", super.createFingerPrint)
            .get("/:id", super.verifyFingerPrint)

    }


}