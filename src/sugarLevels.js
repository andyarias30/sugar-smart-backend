import { db } from './connectDb.js'

export function getAllSugarLevels(req, res) {
    db.collection('sugarLevels').find({}).toArray()
        .then(sugarLevels => {
            res.send(sugarLevels)
        })
        .catch(err => {
            res.status(500).send({ success: false, message: err })
        })
}

export function addSugarLevel(req, res) {
    const newSugarLevel = req.body
    db.collection('sugarLevels').insertOne(newSugarLevel)
        .then(() => {
            res.status(201).send({ message: "Sugar Level added", success: true })
        })
        .catch(err => {
            res.status(500).send({ success: false, message: err })
        })
}

