const { ObjectId } = require('bson');
const User = require('../models/user');


module.exports.getReminders = async function (req, res) {
    try{
        const reminders = await User.findById(req.params.uid).select({"reminders":1});
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
        const reminder = await User.updateOne({_id:uid, 'reminders._id': _id}, {
            $set: {'reminders.$': {...req.body}} 
        });
        res.json({success: true, message: 'reminder was updated!'});
    } catch (err) {
        res.json({success: false, message: err});
    }
    
}
