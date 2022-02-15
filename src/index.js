const nodemailer = require('nodemailer')
const { config } = require('dotenv')

config()

const { MAIL_USER, MAIL_PASS } = process.env

const setupMailer = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      })
}

const sendEmail = (options) => {
    options.from = `"Odie study 👻" ${MAIL_USER}`

    const transport = setupMailer()
    return transport.sendMail(options)
}

const main = async () => {
    const options = {
        to: "odilomar.junior@gmail.com", 
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    }

    await sendEmail(options)
}

main()