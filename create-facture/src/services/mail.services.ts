import { mailer } from '../config'
export const sendMail = async (mail: any) => {
    await mailer.sendMail(mail);
}