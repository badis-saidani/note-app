const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/note-app', {useNewUrlParser: true});

let user = {
    uid: { type: String, index: true, unique: true },
    pwd: { type: String, index: true},
    email: { type: String, index: true, unique: true },
    notebooks : [
        {
            name : { type: String, index: true, unique: true },
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

userSchema.statics.getNoteBookByUid = async function(uid){
    let user = await this.findOne({uid});    
    console.log(user);

    let data = [];
    for (let notebook of user.notebooks){
        let item = {name: notebook.name, notes: []};        
        for (let note of notebook.notes){
            item.notes.push(note.title);
        }
        data.push(item);
    }
    console.log(data);
    return data;
}

userSchema.statics.addNewNoteBook = async function(uid, notebookName){
    //check existed before adding
    let count = await this.findOne({uid, "notebooks.name": notebookName}).count();    
    if (count > 0) {
        return false;
    }
    else {
        let notebook = {
            name: notebookName,
            notes: []
        };

        await this.updateOne({uid}, {$push: {notebooks: notebook}});
        return true;    
    }
}


userSchema.statics.deleteNoteBook = async function(uid, notebookName){
    let result = await this.update(
            {uid, "notebooks.name": notebookName},
            {$pull: {notebooks: {name: notebookName}}}
    );
    console.log("In deleteNoteBook: " + result);
    let count = result.nModified;
    return count;
}

userSchema.statics.updateNoteBook = async function(uid, oldName, newName){
    let result = await this.update(
            {uid, "notebooks.name": oldName},
            {$set: {"notebooks.$.name": newName}}
    );
    
    console.log("In deleteNoteBook: " + result);
    let count = result.nModified;
    return count;
}

module.exports = mongoose.model('users', userSchema);
