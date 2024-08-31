import { EmailRepository, SendMailParams } from "@/core/domain/repositories/email-repository";
import { NodemailerTransportConfig } from "../adapters/nodemailer-conn";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class NodemailerEmailRepositoy extends NodemailerTransportConfig implements EmailRepository{
    async sendMail(params: SendMailParams): Promise<SMTPTransport.SentMessageInfo>{
        const mFrom = process.env.SMTP_FROM_EMAIL
        if(!mFrom)throw new Error("Error at set from mail sender")
        const mailOpt = {...params, from: mFrom}
        return await this.transporter.sendMail(mailOpt)
        
    }
}
export const nodemailerEmailRepository = new NodemailerEmailRepositoy()