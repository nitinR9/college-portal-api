export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            DB_PATH: string
            ADMIN_TEMP_PWD: string
            PRIVATE_KEY_PATH: string
        }
    }
}