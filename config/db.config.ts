import mongoose from 'mongoose'

async function connectingToMongo(){
    const mongoURI = `mongodb+srv://leoncelestino:ipak7Cfuy8hvOylc@cluster0.uousixo.mongodb.net/myFirstMongoAuth?retryWrites=true&w=majority`;
    
    try 
    {
       await mongoose.connect( mongoURI );

        console.log("Connected db!")

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectingToMongo;