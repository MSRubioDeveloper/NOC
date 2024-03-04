
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute( url: string): Promise<boolean>;
}

type SuccesCallback = ()=> void;
type ErrorCallback = ( error: string ) => void;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    //Injeccion de dependencias
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){}

        private callLogs( log: LogEntity ){
            this.logRepository.forEach( logRepository =>{
                logRepository.saveLog( log )
            })
        }

    async execute(url: string): Promise<boolean>{
        
        try{

            const req = await fetch(url);

            if( !req.ok ){
                throw new Error( `Error on check service ${ url }`);
            }

            //guardar log
            const log = new LogEntity({
                message: `Service ${ url } working`,
                level: LogSeverityLevel.low,
                origin: "check-service.ts"
            });
            this.callLogs( log );

            //ejecucion del callback
            this.succesCallback();

            return true;

        } catch( error ){

            const log = new LogEntity({
                message: `ERROR EN LA CONEXION DELS ERVICIO`,
                level: LogSeverityLevel.high,
                origin: "check-service.ts"
            });
            
            this.callLogs( log );

            this.errorCallback( `${error}` )
            return false;
        }


    }
}