import jwt from "jsonwebtoken"

export default class Jwt {

    public token_sign(id: string) {

        const segredo = "process.env.SECRET_JWT"

        const token = jwt.sign({
            id: id,
        }, segredo, { expiresIn: "3d" })

        return { token, id }

    }

}