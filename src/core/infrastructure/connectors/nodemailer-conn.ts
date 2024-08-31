import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";



export abstract class NodemailerTransportConfig{
    private _transporter;
    private host = process.env.SMTP_HOST;
    private port = process.env.SMTP_PORT;
    private user = process.env.SMTP_USER;
    private pass = process.env.SMTP_PASS

    constructor(){
        this._transporter = this.initialize()
    }
    private initialize(){
        const smtpOptions: SMTPTransport.Options = {
            host:this.host,
            port: parseInt(this.port|| "465", 10),
            auth: {
              user: this.user ,
              pass:this.pass,
            },
          };
      
          return nodemailer.createTransport(smtpOptions);
    }
    protected get transporter(){
        return this._transporter
    }
}