// @ts-nocheck

import clientPromise from '../../lib/dbconnect'
// import { Connection, connection } from "mongoose";

export default async function handler2(req, res) {
    if (req.method === 'GET') {
        const client = await clientPromise;
        const db = await client.db('teuxdeux')
        const results = await db.collection('Tasks').find().toArray()
        // console.log(results)
        res.json(results)
    } else if (req.method === 'POST') {

        const date = req.body.date
        const task = req.body.task

        const client = await clientPromise;
        const db = await client.db('teuxdeux')
        const results = await db.collection('Tasks').insertOne({ date: date, tasks: [{ task: task, repeat: "none" }] })
        res.json(results)
    } else if (req.method === 'PUT') {

        if (req.body.insert === true) {
            const date = req.body.date
            const task = req.body.task

            const client = await clientPromise;
            const db = await client.db('teuxdeux')
            const results = await db.collection('Tasks').updateOne({ date: date }, { $push: { tasks: { task: task, repeat: "none" } } })
            res.json(results)
        }else if(req.body.insert===false){
            const date=req.body.date
            const tasks = req.body.tasks
            const prevTasks = req.body.prevTasks
            const key = req.body.key

            const client = await clientPromise
            const db = await client.db('teuxdeux')
            const results = await db.collection('Tasks').updateOne({date:date}, {$set:{[`tasks.${key}`]:tasks}})
            res.json(results)
            console.log(results)
        }

    }

}