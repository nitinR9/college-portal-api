import { drizzle } from 'drizzle-orm/better-sqlite3'
import { LoadPrivateKey, GenerateToken } from '@/utils/common-func'
import { credentials, users } from './schema'
import rns from 'randomstring'
import b from 'bcrypt'
import Database from 'better-sqlite3'
import Defaults from '@/utils/defaults'
import 'dotenv/config'

const PATH = process.env.DB_PATH || Defaults.DB_PATH
const ADMIN_PWD = rns.generate(6)
const sqlite = new Database(PATH)
const privateKey = LoadPrivateKey(process.env.PRIVATE_KEY_PATH!)

async function initDB() {
    const db = drizzle(sqlite)
    
    await db.transaction(async (tx) => {
        const [admin] = (await tx.insert(users).values({
            userName: 'admin',
            registrationNo: '1',
            role: 'admin'
        }).returning())
    
        const salt = await b.genSalt()
        const hPwd = await b.hash(ADMIN_PWD, salt)
        const tempToken = await GenerateToken(admin, privateKey)
    
        await tx.insert(credentials).values({
            uId: admin.uId,
            hash: hPwd,
            tempToken
        })
    })
    
    console.log('Admin user created!')
    console.log('Here is your password: ', ADMIN_PWD)
    process.exit(0)
}

initDB().catch(e => {
    console.error('Admin user creation failed!')
    console.error(e)
    process.exit(1)
})