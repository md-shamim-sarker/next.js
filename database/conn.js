import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const MONGO_URI = "mongodb://127.0.0.1:27017/nextapp";

const connectMongo = async () => {
    try {
        const {connection} = await mongoose.connect(MONGO_URI);
        if(connection.readyState === 1) {
            console.log('Database Connected!');
        } else {
            console.log('Database Not Connected!');
        }
    } catch(error) {
        console.log(error.message);
    }
};

export default connectMongo;