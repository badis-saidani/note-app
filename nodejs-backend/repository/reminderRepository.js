const { ObjectId } = require('bson');
const User = require('../models/user');


module.exports.getReminders = async function (req, res) {
    console.log('param: ', req.params.uid);
    try{
        const reminders = await User.findById(req.params.uid).select({"reminders":1});

// console.log(reminders.reminders);
        res.json(reminders)
    } catch (err) {
        res.json({message: err});
    }
}

module.exports.getSingleReminder = async function (req, res) {
    const uid = req.params.uid;
    const _id = req.params._id;
    
    try {
        const reminders = await User.findById(id).reminder;
        const reminder = reminders.find(r=> r._id == _id)
        res.json({success: true, data:reminder});
    } catch (err) {
        res.json({success: false, message: err});
    }
}

module.exports.addReminder = async function (req, res) {
    const uid = req.params.uid;
    const reminder = {
        _id: new ObjectId(),
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
    const _id = req.params._id;
    try {
        const reminder = await User.findByIdAndUpdate(uid, {
            $pull: {'reminders._id': _id}
        });
        res.json({success: true, message: 'reminder was deleted!'});
    } catch (err) {
        res.json({success: false, message: err});
    }
    
}

module.exports.updateReminder = async function (req, res) {
    const uid = req.params.uid;
    const _id = req.params._id;
    try {
        const reminder = await User.findOneAndUpdate({uid:uid, 'reminders._id': _id}, {
            $set: {'reminders.$': req.body}
        });
        res.json({success: true, message: 'reminder was updated!'});
    } catch (err) {
        res.json({success: false, message: err});
    }
    
}
