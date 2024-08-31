import { nodemailerEmailRepository } from "@/core/infrastructure/repositories/nodemailer-email-repository"
import { SendMailParams } from "../../services/email"

export const createVerificationEmailUC = (verificationLink: string) => {
    return nodemailerEmailRepository.createVerificationEmail(verificationLink)
}
export const sendMailUC = async(params: SendMailParams) => {
    return nodemailerEmailRepository.sendMail(params)
}