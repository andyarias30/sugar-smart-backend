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

export async function addSugarLevel(req, res) {
    console.log("req.doy-->", req.body)
    const currentDate = new Date()
    currentDate.setUTCHours(0, 0, 0, 0)
    const userData = await db.collection('sugarLevels').find({ userName: req.body.userName, currentDate: { $gte: currentDate } }).toArray() // filter to find the objects of the same user whit the same date 
    console.log('userData-->', userData)
    console.log('currentDate ->', currentDate)

    if (userData.length > 0) {
       await db.collection('sugarLevels').findOneAndUpdate({ userName: req.body.userName, currentDate: { $gte: currentDate } }, { $set: req.body }) 
       res.status(201).send({message: "sugar level found it", success: true})
        console.log('next steps')
    } else {
        const newSugarLevel = req.body
        db.collection('sugarLevels').insertOne({ ...newSugarLevel, currentDate: currentDate })
            .then(() => {
                res.status(201).send({ message: "Sugar Level added", success: true })
            })
            .catch(err => {
                res.status(500).send({ success: false, message: err })
            })
    }
}


