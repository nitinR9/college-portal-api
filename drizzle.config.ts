import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'sqlite',
    schema: './src/db/schema.ts',
    verbose: true,
    strict: true
})