import EncryptService from "../../application/ports/EncryptService";
import bcrypt from "bcrypt";

export default class BcryptEncryptService implements EncryptService {
    async encrypt(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}