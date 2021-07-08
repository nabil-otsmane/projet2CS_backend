import { mailer } from '../config'
export const sendMail = async (mail: any) => {
    console.log(mail);
    mailer.sendMail(mail);
}