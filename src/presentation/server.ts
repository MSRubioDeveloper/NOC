import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrestructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrestructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrestructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrestructure/repositories/log-implementation.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";



//instancia que usaras para mandara al CheckService
const fslogReposiroty = new LogRepositoryImpl( 
    new FileSystemDataSource(),
    // new postgressSQLLogDatAsOURCE
    //  new MongoLogDataSource()
);

const mongoLogRepository = new LogRepositoryImpl( 
      new MongoLogDataSource()
);

const postgresqlLogRepository = new LogRepositoryImpl(
    new   PostgresLogDataSource()
);

const fechActual = {
    dia: new Date().getDate(),
    mes: new Date().getMonth() + 1,
    year: new Date().getFullYear()
}

const emailService = new EmailService();

export class Server{

    public static async start(){

        console.log("Server started...");

        //Mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute( ["msilvarubios3@hotmail.com"] )

        
        // emailService.sendEmailWithFileSystemLogs(
        //     ["msilvarubios3@hotmail.com"]
        // )

        // const logs = await logReposiroty.getLogs( LogSeverityLevel.low)
        // console.log(logs)

        //servicio de logs
        CronService.createJob(
            "*/5 * * * * *",
            () => {
                const url = "httadadadoogle.com"
                //use case
                new CheckServiceMultiple(
                    //arg1
                    [fslogReposiroty, mongoLogRepository, postgresqlLogRepository],
                    //arg 2
                    ()=> console.log("Server is ok: " + url),
                    //arg3
                    ( error )=> console.log( error )
                ).execute( url )
            }
        );


    }

}