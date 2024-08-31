import { nodemailerEmailRepository } from "@/core/infrastructure/repositories/nodemailer-email-repository"
import { SendMailParams } from "../repositories/email-repository"

export const createVerificationEmailUC = (verificationLink: string) => {
    return nodemailerEmailRepository.createVerificationEmail(verificationLink)
}
export const sendMailUC = async(params: SendMailParams) => {
    return nodemailerEmailRepository.sendMail(params)
}