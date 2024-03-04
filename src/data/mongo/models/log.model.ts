import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";
// Creando objeto que se asemeje a la entidad LogSeverityLevel

//     level: LogSeverityLevel;
//     message: string;

//     origin: string;
//     createdAt?: Date;


//reglas del objeto / osea el schema
const logSchema = new mongoose.Schema({

    message: {
        type: String,
        require: true
    },
    level: {
        type: String,
        enum: [ "low", "medium", "high"],
        default: "low"
    },
    origin: {
        type: String
    }, 
    createdAt: {
        type: Date,
        default: new Date()
    },
});


//Modelo
export const logModel = mongoose.model("log", logSchema);