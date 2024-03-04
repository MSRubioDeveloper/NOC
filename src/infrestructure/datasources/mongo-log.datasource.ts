import { logModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




export class MongoLogDataSource implements LogDataSource{
    
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await logModel.create( log );
        console.log("Mongo log created", newLog.id);

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await logModel.find({
            level: severityLevel
        });
        //mapeo, cada iteracion cosntruiye un opbjeto tipo LogEntoty  
        // ya que el objeto de la  DataBase no luce igual a LogEntity
        return logs.map( mongoLog => LogEntity.fromObject( mongoLog ))
    }
    
}