import JwtService from "../../application/ports/JwtService";

const jwt = require('jsonwebtoken');

export default class JsonwebtokenJwtService implements JwtService {
    async generateToken(payload: Object): Promise<string> {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    }

    async checkToken(token: string): Promise<boolean> {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}