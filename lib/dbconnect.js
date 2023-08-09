// import mongoose from 'mongoose'

// global.mangoose={
//     conn:null,
//     promise:null
// }

// async function connection(){
//     if(global.mongoose&&global.mongoose.conn){
//         console.log('using existing connection')
//         return global.mongoose.conn;
       
//     }else{

//         const user=process.env.MONGODB_USER;
//         const password=process.env.MONGODB_PASSWORD
//         const database=process.env.MOGODB_DATABASE
//         const constring=`mongodb+srv://${user}:${password}@cluster0.tjivx87.mongodb.net/${database}?retryWrites=true&w=majority`
//         const promise=mongoose.connect(constring,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//             autoIndex:true
//         }).then(mongoose=>mongoose); 

//         console.log('new connection successfull')
//     }
//     global.mongoose={
//         conn: await promise,
//         promise
//     }

//     return await promise
// }

// export default connection


// mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
