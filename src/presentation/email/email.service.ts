import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlbody: string;
    attachements?: Attachment[]
}

interface Attachment{
    filename: string;
    path: string;
}


export class EmailService{

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }

    });


    constructor(
        // DI - saveLogs
       
    ){ }


    async sendEmail( options: SendMailOptions): Promise<boolean>{
        
        const { to, subject, htmlbody, attachements = []} = options;
        
        try{

            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlbody,
                attachments: attachements
            });
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: "Email was sended succefully!",
                origin: "email.service.ts"
            })
            

            return true;
            
        }catch( error ){
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: "Email was not sent",
                origin: "email.service.ts"
            })
          

         return false;
        }

    }



    async sendEmailWithFileSystemLogs( to: string | string[]){
        const subject = "Logs del servidor";
        const htmlBody = `
        <h3> Logs de sistema - NOC </h3>
        <p>
            Muy buenas noches,a djunto los logs del servidor del diade hoy
        </p>
        <p> Ver logs adjuntos </p>
        `;

        const attachements: Attachment[] = [
            { filename: "logs-all.log", path: "./logs/logs-all.log"  },
            { filename: "logs-medium.log", path: "./logs/logs-medium.log"  },
            { filename: "logs-high.log", path: "./logs/logs-high.log"  },
        ];

        const sent = this.sendEmail( {
            to,
            subject, 
            attachements,
            htmlbody: htmlBody
        });

        return sent;

    }

}