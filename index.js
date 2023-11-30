import express from 'express'
import cors from 'cors'
import { getAllSugarLevels, addSugarLevel } from './src/sugarLevels.js'

const PORT = process.env.PORT || 3005

const app = express()
app.use(express.json())
app.use(cors())

app.get("/mySugarLevels", getAllSugarLevels)
app.post("/mySugarLevels", addSugarLevel)


app.listen(PORT, () => {
    console.log(` Listening on http://localhost:${PORT}...❤️⚕️🩸`)
})