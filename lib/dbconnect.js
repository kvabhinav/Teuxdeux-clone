import mongoose from 'mongoose'

global.mangoose={
    conn:null,
    promise:null
}

async function connection(){
    if(global.mongoose&&global.mongoose.conn){
        console.log('using existing connection')
        return global.mongoose.conn;
       
    }else{

        const user=process.env.MONGODB_USER;
        const password=process.env.MONGODB_PASSWORD
        const database=process.env.MOGODB_DATABASE
        const constring=`mongodb+srv://${user}:${password}@cluster0.tjivx87.mongodb.net/${database}?retryWrites=true&w=majority`
        const promise=mongoose.connect(constring,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            autoIndex:true
        }).then(mongoose=>mongoose); 

        console.log('new connection successfull')
    }
    global.mongoose={
        conn: await promise,
        promise
    }

    return await promise
}

export default connection