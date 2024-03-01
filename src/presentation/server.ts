import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server{

    public static start(){

        console.log("Server started...");

        CronService.createJob(
            "*/5 * * * * *",
            () => {
                const url = "https://google.com"
                //use case
                new CheckService(
                    ()=> console.log("Server is ok: " + url),
                    
                    ( error )=> console.log( error )
                ).execute( url )
            }
        );


    }

}