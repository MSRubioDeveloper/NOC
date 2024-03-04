
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute( url: string): Promise<boolean>;
}

type SuccesCallback = ()=> void;
type ErrorCallback = ( error: string ) => void;


export class CheckService implements CheckServiceUseCase {

    //Injeccion de dependencias
    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){}



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
            this.logRepository.saveLog( log );

            //ejecucion del callback
            this.succesCallback();

            return true;

        } catch( error ){

            const log = new LogEntity({
                message: `ERROR EN LA CONEXION DELS ERVICIO`,
                level: LogSeverityLevel.high,
                origin: "check-service.ts"
            });
            
            this.logRepository.saveLog( log );

            this.errorCallback( `${error}` )
            return false;
        }


    }
}