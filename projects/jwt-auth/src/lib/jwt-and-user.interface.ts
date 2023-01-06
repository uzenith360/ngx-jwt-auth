import User from './user.interface';

export default interface JWTAndUser {
    access_token: string;
    token_type: string;
    // expires_in: number;
    user: User;
}
