import bcrypt from "bcrypt"
import zxcvbn from "zxcvbn"

export default class Passowrd {


    protected async VerifyLevel(password: string) {

        const level = zxcvbn(password)

        return level.score

    }

    protected async ComparePassword(passwordactually: string, passwordOld: string) {

        const passwordcorrect = bcrypt.compareSync(passwordactually, passwordOld)

        if (!passwordcorrect) {
            return (`A palavra passe ${passwordactually} está incorreta.`)
        } else {
            return passwordcorrect
        }


    }

    protected async Encrypt(password: string) {

        const salt = 10

        return bcrypt.hashSync(password, salt)


    }

}