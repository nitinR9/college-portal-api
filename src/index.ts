import express from 'express'
import cors from 'cors'
import Defaults from './utils/defaults'
import 'dotenv/config'

const api = express()
const PORT = process.env.SERVER_PORT || Defaults.PORT

api.use(cors())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.listen(PORT, () => {
    console.log(`Server online on url: http://localhost:${PORT}`)
})