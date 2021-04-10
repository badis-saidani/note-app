const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/note-app', {useNewUrlParser: true});

let user = {
    uid: { type: String, index: true, unique: true },
    pwd: { type: String, index: true},
    email: { type: String, index: true, unique: true },
    notebooks : [
        {
            name : String,
            notes : [
                {
                    title: { type: String, index: true, unique: true },
                    content: String,
                    created_at: Date,
                    updated_at: Date
                }
            ]
        }
    ]
};

const userSchema = new mongoose.Schema(user);

userSchema.statics.findByUid = function(uid, callback){
    return this.findOne({uid}, callback);
}

module.exports = mongoose.model('users', userSchema);