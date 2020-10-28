const nodemailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user) {
        this.to = user.email;
        this.name = user.ten;
        this.from = `Trung tâm đào tạo lái xe HND <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        // Create transporter
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(template, subject, data) {
        // 1. Render HTML based on ejs template
        let html = "";

        ejs.renderFile(
            `${__dirname}/../views/emails/${template}.ejs`,
            {
                ...data,
                receiverEmail: this.to,
                receiverName: this.name,
            },
            null,
            (err, str) => {
                html = str;
            }
        );

        // 2. Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            text: htmlToText.fromString(html),
            html: html
        };

        // 3. Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
};
