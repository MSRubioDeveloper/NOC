import mongoose from "mongoose";

interface ConnectionOptions{
    mongoUlr: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: ConnectionOptions ) {
        const { mongoUlr, dbName } = options;

        try{

            await mongoose.connect( mongoUlr, { 
                dbName: dbName,
                //puedes mandar mas opcciones de conexion

            } );

            console.log("Mongo Connected");

        }catch ( error ){
            console.log("Mongo connection error");
            throw error;
        }
    }
}