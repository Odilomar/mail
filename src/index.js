const path = require("path");
const fs = require("fs").promises;
const { sendEmail } = require('./mail')

const dirname = path.join(__dirname, "archive");

const options = {
  to: "odilomar.junior@gmail.com",
  subject: "Hello ✔",
  text: "Hello world?",
  html: "<b>Hello world?</b>",
};

const sendDefaultEmail = async () => {
  await sendEmail(options)
}

const sendEmailtWithAttachmentsByPath = async () => {
  const files = await fs.readdir(dirname)
  options.subject= "Hello (attachments by path) ✔"

  options.attachments = files.map((file) => {
    return {
      filename: file,
      path: path.join(dirname, file),
    };
  }),

  await sendEmail(options)
};

const sendEmailtWithAttachmentsByBufer = async () => {
  const files = await fs.readdir(dirname)

  options.attachments = []
  options.subject= "Hello (attachments by bufer) ✔"

  for (const file of files) {
    const filePath = path.join(dirname, file)
    const buffer = await fs.readFile(filePath, { encoding: 'utf-8' })

    options.attachments.push({      
      filename: file,
      content: buffer,
    })
  }

  await sendEmail(options)
}

sendDefaultEmail();
// sendEmailtWithAttachmentsByPath();
// sendEmailtWithAttachmentsByBufer();
