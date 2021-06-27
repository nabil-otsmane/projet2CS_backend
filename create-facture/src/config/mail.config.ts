const nodemailer = require("nodemailer");
export const mailer = nodemailer.createTransport({
    host: "smtp.googlemail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "autolibdz@gmail.com", // generated ethereal user
        pass: "znpqxpqytldajgit", // generated ethereal password
    },
});