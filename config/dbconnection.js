const mongoose=require('mongoose')

const connectedDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb Connected",connect.connection.host,connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports=connectedDB