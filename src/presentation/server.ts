import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrestructure/repositories/log-implementation.repository";
import { CronService } from "./cron/cron-service";



//instancia que usaras para mandara al CheckService
const fileSystemLogRepository = new LogRepositoryImpl( 
    new FileSystemDataSource(),
    // new postgressSQLLogDatAsOURCE
    // new MongoLogDataSource
);

export class Server{

    public static start(){

        console.log("Server started...");

        //Mandar email




        //servicio de logs
        // CronService.createJob(
        //     "*/5 * * * * *",
        //     () => {
        //         const url = "https://google.com"
        //         //use case
        //         new CheckService(
        //             //arg1
        //              fileSystemLogRepository,
        //             //arg 2
        //             ()=> console.log("Server is ok: " + url),
        //             //arg3
        //             ( error )=> console.log( error )
        //         ).execute( url )
        //     }
        // );


    }

}