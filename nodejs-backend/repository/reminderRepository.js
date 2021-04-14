const { ObjectId } = require('bson');
const User = require('../models/user');
const {sendEmail} = require('../utils/emailing');


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
        const user = await User.findOne({_id:uid});
        const email = user.email;
        const data = await User.findByIdAndUpdate(uid, {
            $push: {reminders: reminder}
        });
        sendEmail(email,req.body,'New');
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


