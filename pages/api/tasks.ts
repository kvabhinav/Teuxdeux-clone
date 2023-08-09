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
    }else if(req.method==='POST'){

        const date = req.body.date
        const task = req.body.task

        const client = await clientPromise;
        const db = await client.db('teuxdeux')
        const results = await db.collection('Tasks').insertOne({date:date,tasks:[{task:task,repeat:"none"}]})
        console.log(results)
        res.json(results)
    }

}