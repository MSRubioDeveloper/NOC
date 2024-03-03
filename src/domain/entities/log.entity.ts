

export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
} 

export class LogEntity{

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( message: string, level: LogSeverityLevel, origin: string ){

        this.message = message;
        this.level = level;
        this.createdAt = new Date();
   
    }

    //metodo que crea instancias en base a ese JSON string
    static fromJson = ( json: string ): LogEntity => {
        const { message, level, createdAt } = JSON.parse( json );

        const log = new LogEntity( message, level);
        log.createdAt = new Date( createdAt );

        return log;
    }
}