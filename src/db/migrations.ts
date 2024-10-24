import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import 'dotenv/config'

const sqlite = new Database(process.env.DB_PATH)

async function initMigration(){
    console.log('Migration started !')
    const db = drizzle(sqlite)
    await migrate(db, { migrationsFolder: 'drizzle' })
    console.log('Migration ended !')
    process.exit(0)
}

initMigration().catch(e => {
    console.error('Migration failed !')
    console.error(e)
    process.exit(1)
})