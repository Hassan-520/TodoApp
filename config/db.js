import mongoose  from "mongoose";
const connectDB = async()=>{
    try{
        const dbUrl = process.env.MONGO_URL;
        const conn = await mongoose.connect(dbUrl)
        const dbConnection = conn.connection.host;
        console.log(`Connected to MongoDb Database ${dbConnection}`)
    }catch(error)
    {
        console.log(`Error in MongoDb ${error}`)
    }
    
}
export default connectDB;