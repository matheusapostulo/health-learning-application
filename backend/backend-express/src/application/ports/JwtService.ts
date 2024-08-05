export default interface JwtService {
    generateToken(payload: Object): Promise<string>;
    checkToken(token: string): Promise<boolean>;
}