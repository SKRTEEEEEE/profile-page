import SMTPTransport from "nodemailer/lib/smtp-transport"

export type EmailRepository = {
    sendMail(params: SendMailParams): Promise<SMTPTransport.SentMessageInfo>
}
export type SendMailParams = {
    to: string,
    subject: string,
    html: string,
}