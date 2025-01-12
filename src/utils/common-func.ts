import { User } from "@/db/schema/users";
import { sign } from 'jsonwebtoken'
import fs from 'fs'

export function LoadPrivateKey(path: string){
    return fs.readFileSync(path, 'utf-8')
}

export async function GenerateToken(user: User, key: string) {
    return sign(user, key, {
        expiresIn: '1d',
        algorithm: 'RS256'
    })
}