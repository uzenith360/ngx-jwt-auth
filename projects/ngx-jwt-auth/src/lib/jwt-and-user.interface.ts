// import User from './user.interface';

// export default interface JWTAndUser {
//     access_token: string;
//     token_type: string;
//     // expires_in: number;

//     // user: User;
// }

import { JwtInterface as JWT } from '@uzenith360/jwt-utils';
import User from './user.interface';

export default interface JWTAndUser {
    jwt: JWT;
    user: User;
}
