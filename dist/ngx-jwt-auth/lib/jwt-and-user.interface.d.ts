import JWT from './jwt.interface';
import User from './user.interface';
export default interface JWTAndUser {
    jwt: JWT;
    user: User;
}
