import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



const prismaClient = new PrismaClient();

//equivalencias
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,

}

export class PostgresLogDataSource implements LogDataSource{

    //TAREA! implementa esto
    async saveLog(log: LogEntity): Promise<void> {

        const level =severityEnum[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        });
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];

        const logs = await prismaClient.logModel.findMany({
            where: {
                level : level
            }
        });

        return logs.map( LogEntity.fromObject )
    }
    
}