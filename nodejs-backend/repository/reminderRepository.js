const { ObjectId } = require('bson');
const nodemailer = require("nodemailer");
var dateFormat = require('dateformat');
const User = require('../models/user');


module.exports.getReminders = async function (req, res) {
    try{
        const reminders = await User.findById(req.params.uid)
        .select({"reminders":1});
        reminders.reminders.sort(function(r1, r2) { return r2.updated_at - r1.updated_at; });
        console.log(reminders);
        res.json(reminders)
    } catch (err) {
        res.json({message: err});
    }
}

module.exports.getSingleReminder = async function (req, res) {
    const uid = req.params.uid;
    const _id = req.params.id;
    
    try {
        const result = await User.findById(uid).select({"reminders":1});
        const reminder = result.reminders.find(r=> r._id == _id)
        res.json({success: true, data:reminder});
    } catch (err) {
        res.json({success: false, message: err});
    }
}

module.exports.addReminder = async function (req, res) {
    const uid = req.params.uid;
    const num = new ObjectId();
    console.log('num: ', num);
    const reminder = {
        _id: num,
        ...req.body
    }
    
    try {
        const data = await User.findByIdAndUpdate(uid, {
            $push: {reminders: reminder}
        });
        res.json({success: true, message: 'reminder was added!'});
    } catch (err) {
        res.json({success: false, message: err});
    }
}

module.exports.deleteReminder = async function (req, res) {
    const uid = req.params.uid;
    const _id = req.params.id;
    try {
        const reminder = await User.findByIdAndUpdate(uid, {
            $pull: {'reminders': {'_id': _id}}
        });
        res.json({success: true, message: 'reminder was deleted!'});
    } catch (err) {
        res.json({success: false, message: err});
    }
    
}

module.exports.updateReminder = async function (req, res) {
    const uid = req.params.uid;
    const _id = req.params.id;
    try {
        const user = await User.findOne({_id:uid});
        const email = user.email;
        const reminder = await User.updateOne({_id:uid, 'reminders._id': _id}, {
            $set: {'reminders.$': {...req.body}} 
        });
        console.log('----------------------')
        console.log(email);
        sendEmail(email,req.body,'Update');
        res.json({success: true, message: 'reminder was updated!'});
    } catch (err) {
        res.json({success: false, message: err});
    }
    
}


async function sendEmail(emailTo, reminder, option) {
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