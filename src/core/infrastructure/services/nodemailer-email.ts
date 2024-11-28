import { EmailRepository, SendMailParams } from "@/core/application/interfaces/services/email";
import { NodemailerTransportConfig } from "../connectors/nodemailer-conn";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { SetEnvError } from "@/core/domain/errors/main";
import { verificationEmailTemplate } from "./verification-email-template";

class NodemailerEmailRepositoy extends NodemailerTransportConfig implements EmailRepository{
    private mFrom = process.env.SMTP_FROM_EMAIL
    async sendMail(params: SendMailParams): Promise<SMTPTransport.SentMessageInfo>{
        if(!this.mFrom)throw new SetEnvError("mail sender")
        const mailOpt = {...params, from: this.mFrom}
        return await this.transporter.sendMail(mailOpt)
    }
    createVerificationEmail(verificationLink: string): string{
        return verificationEmailTemplate(verificationLink)
    }
}
export const nodemailerEmailRepository = new NodemailerEmailRepositoy()
