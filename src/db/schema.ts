import { index, integer, sqliteTable, text, blob } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
    uId: integer('user_id', { mode: 'number' }).primaryKey({ autoIncrement: true }).notNull(),
    userName: text('user_name', { mode: 'text', length: 10 }).unique().notNull(),
    registrationNo: text('reg_no', { mode: 'text', length: 12 }).unique().notNull(),
    role: text('text', { mode: 'text', enum: ['student', 'staff', 'admin'] }).notNull()
}, (table) => {
    return {
        userIdx: index('user_idx').on(table.uId, table.userName)
    }
}) ;

export const credentials = sqliteTable('secrets', {
    sId: integer('s_id', { mode: 'number' }).primaryKey({ autoIncrement: true }).notNull(),
    uId: integer('user_id', { mode: 'number' }).references(() => users.uId, { onDelete: 'cascade' }).unique().notNull(),
    hash: text('hash', { mode: 'text' }),
    tempToken: text('temp_token', { mode: 'text' }),
    refToken: text('ref_tokem', { mode: 'text' })
}, (table) => {
    return {
        secretIdx: index('secret_idx').on(table.sId, table.uId)
    }
}) ;

export const details = sqliteTable('details', {
    dId: integer('d_id', { mode: 'number' }).primaryKey({ autoIncrement: true }).notNull(),
    uId: integer('user_id', { mode: 'number' }).references(() => users.uId, { onDelete: 'cascade' }).unique().notNull(),
    firstName: text('first_name', { mode: 'text', length: 30 }).notNull(),
    middleName: text('middle_name', {  mode: 'text', length: 30 }),
    lastName: text('last_name', {  mode: 'text', length: 30 }).notNull(),
    img: blob('img', { mode: 'buffer' }),
    fileName: text('file_name', { mode: 'text', length: 40 }),
    email: text('email', { mode: 'text', length: 80 }).unique().notNull(),
    address: text('addr', { mode: 'text', length: 150 }),
    mobNo: text('mobile_no', { mode: 'text', length: 10 }),
    countryCode: text('country_code', { mode: 'text', length: 5 }),
    updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date())
}, (table) => {
    return {
        details_idx: index('details_idx').on(table.dId, table.uId)
    }
}) ;
