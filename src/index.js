const path = require("path");
const fs = require("fs").promises;
const { sendEmail } = require('./mail')

const main = async () => {
  const dirname = path.join(__dirname, "archive");
  const files = await fs.readdir(dirname);

  const options = {
    to: "odilomar.junior@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
    attachments: files.map((file) => {
      return {
        filename: file,
        path: path.join(dirname, file),
      };
    }),
  };

  await sendEmail(options);
};

main();
