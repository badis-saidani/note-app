
const nodemailer = require("nodemailer");
var dateFormat = require('dateformat');

module.exports.sendEmail = async function (emailTo, reminder, option) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Badis Saidani 👻" <bsaidani@miu.edu>', // sender address
      to: emailTo, // list of receivers
      subject: `${option} Reminder ✔ ${reminder.title}`, // Subject line
      text: reminder.content, // plain text body
      html: `<p>${reminder.content}</p><br>
      <p><b>Time: ${dateFormat(reminder.set_at, "yyyy-mm-dd h:MM")}</b></p>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }