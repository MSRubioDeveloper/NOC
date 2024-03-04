import { PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



const prismaClient = new PrismaClient();


export class PostgresLogDataSource implements LogDataSource{

    //TAREA! implementa esto
    saveLog(log: LogEntity): Promise<void> {
        const saveData = prismaClient.logModel.
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}