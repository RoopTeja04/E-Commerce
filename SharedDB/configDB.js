const ConnectDB = async (mongoose) => {
    try{
        const DB = process.env.MongoDB_URL;

        if(!DB) {
            console.log("MONGO_URI is not defined in environment variables");
        }

        await mongoose.connect(DB);
        console.log("DataBase Connected Successfully");

    }catch(err){
        console.log("Error in connecting to the database", err);
        process.exit(1);
    }
}

module.exports = ConnectDB;