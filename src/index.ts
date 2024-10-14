import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const api = express()
const PORT = process.env.SERVER_PORT || 5000

api.use(cors())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.listen(PORT, () => {
    console.log(`Server online on url: http://localhost:${PORT}`)
})