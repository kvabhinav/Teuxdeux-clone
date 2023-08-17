//@ts-nocheck
import clientPromise from "@/lib/dbconnect";

export default async function handler(req: any, res: any) {
    const client = await clientPromise
    if (req.method === 'POST') {
        try {

            const task = req.body.task
            const date = req.body.newDate
            const index = req.body.index

            await client.connect()
            const session = await client.startSession()
            await session.startTransaction()
            const db = client.db('teuxdeux')

            //database insertion and updation
            let result
            if(index===0 ||index===undefined){
               result = db.collection('Tasks').insertOne({ date: date, tasks: [task] })  
               console.log('its too worked mahn')
            }else{
                result = db.collection('Tasks').updateOne({date:date},{ $push: { tasks:task } })
            }
            console.log('its worked.',result)
            
            await session.endSession()
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }
    if (req.method === 'DELETE') {
        try {
            const task = req.body.task
            const date = req.body.prevDate
            const index = req.body.index
            const length = req.body.length

            await client.connect()
            const session = await client.startSession()
            await session.startTransaction()
            const db = client.db('teuxdeux')


            //database deletion and updation
            let result
            if (length === 1) {
                 result = db.collection('Tasks').deleteOne({ date: date })
                 console.log('deletion whole ')
            } else {
                 result = db.collection('Tasks').updateOne({ date: date },{$pull:{tasks:task}})
                 console.log('deletion single')
            }
            await session.commitTransaction()
            await session.endSession()
            res.json(result)
        } catch (error) {
            console.log(error)
        }
    }

}