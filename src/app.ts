
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/env.plugins";
import { MongoDatabase, logModel } from "./data/mongo";
import { Server } from "./presentation/server";




(async ()=>{

    await main();

})();


async function main() {

    await MongoDatabase.connect({
        mongoUlr: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });


    //Prisma - PostgreSQL
    const prisma = new PrismaClient()
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: "MEDIUM",
    //         message: "Test Message - PRISMA POSTGRESQL",
    //         origin: "APP.ts"
    //     }
    // })

    // console.log ( newLog ); 

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: "HIGH"
    //     }
    // });

    // console.log( logs )

     Server.start();


}