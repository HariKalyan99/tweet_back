import mongoose from 'mongoose';


const connectToMongo = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongo server: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connecting to Mongo server", error)
    }
}

export default connectToMongo;