

export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
} 

export interface LogEntityOptions{
    level: LogSeverityLevel;
    message: string;

    origin: string;
    createdAt?: Date;
}

export class LogEntity{

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ){
        const { message, level, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
   
    }

    //metodo que crea instancias en base a ese JSON string
    static fromJson = ( json: string = "{}" ): LogEntity => {

        json = ( json === "") ? "{}" : json;
        if( json === "{}") [];
        
        const { message, level, createdAt, origin } = JSON.parse( json );

        const log = new LogEntity( {
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin
        });

        return log;
    }


    // Crear un logEntoity basado en un objet
    //estas adaptando un objeto que luce como el modelod e mongo a un objeto que lusca como
    //logentity
    static fromObject = ( object: { [key: string]: any } ): LogEntity => {
        const { message, level, createdAt, origin  } = object;    
        // validaciones

        const log = new LogEntity({
            message, level, createdAt, origin
        })

        return log;
 
    }   
}