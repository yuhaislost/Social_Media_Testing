import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const privateJWTKey = fs.readFileSync(path.join(__dirname, 'config', 'keys', 'PrivateKey.jwt.key'), 'utf-8');
const publicJWTKey = fs.readFileSync(path.join(__dirname, 'config', 'keys', 'PublicKey.jwt.key'), 'utf-8');

class AuthenticationService {
    createAccessToken(t_Id, t_Expiry)
    {
        return jwt.sign({id: t_Id}, privateJWTKey, {
            expiresIn: t_Expiry,
            algorithm: 'RS256',
        });
    }

    createRefreshToken(t_Id, t_Expiry)
    {
        return jwt.sign({id: t_Id}, privateJWTKey, {
            expiresIn: t_Expiry,
            algorithm: 'RS256'
        });
    }

    createTokens(t_Id, t_AccessTokenExpiry, t_RefreshTokenExpiry)
    {
        const accessToken = this.createAccessToken(t_Id, t_AccessTokenExpiry);
        const refreshToken = this.createRefreshToken(t_Id, t_RefreshTokenExpiry);

        return accessToken, refreshToken;
    }

    async verif(t_Token)
    {
        try{
            return await promisify(jwt.verify)(t_Token, publicJWTKey, {algorithms: ['RS256']});
        }catch(error)
        {
            console.log(error);
        }
    }

    async decode(t_Token)
    {
        try{
            return await jwt.decode(t_Token);
        }catch(error)
        {
            console.log(error);
        }
    }
    
};

export default new AuthenticationService();