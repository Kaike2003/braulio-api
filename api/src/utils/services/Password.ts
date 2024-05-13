import bcrypt from "bcrypt"
import zxcvbn from "zxcvbn"

export default class Passowrd {


    protected async VerifyLevel(password: string) {

        const level = zxcvbn(password)

        return level.score

    }


    protected async Encrypt(password: string) {

        const salt = 10

        return bcrypt.hashSync(password, salt)


    }

}