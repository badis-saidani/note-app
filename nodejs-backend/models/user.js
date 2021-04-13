const { ObjectId, Timestamp } = require('bson');
const mongoose = require('mongoose')

//mongodb://localhost:27017/note-app
mongoose.connect('mongodb+srv://badis:badis@cluster0.xnus3.mongodb.net/mwa-project?retryWrites=true&w=majority', { useNewUrlParser: true });

let user = { // the user should have a name
    uid: { type: String, index: true, unique: true },
    name: {type: String},
    pwd: { type: String, index: true },
    email: { type: String, index: true, unique: true },
    notebooks: [
        {
            name: String,
            notes: [
                {
                    title: String,
                    content: String,
                    created_at: Date,
                    updated_at: Date
                }
            ]
        }
    ],
    reminders: [
        {
            _id: mongoose.Types.ObjectId,
            title: { type: String, index: true },
            content: String,
            set_at: Date,
            created_at: Date,
            updated_at: Date
        }
    ]
};

const userSchema = new mongoose.Schema(user);

//Begin Notebook region
userSchema.statics.getNoteBookByUid = async function (uid) {
    let user = await this.findOne({ uid });
    let data = [];

    for (let notebook of user.notebooks) {
        let item = { id: notebook._id, name: notebook.name, notes: [] };
        for (let note of notebook.notes) {
            item.notes.push(note.title);
        }
        data.push(item);
    }
    console.log(data);
    return data;
}


userSchema.statics.addNewNoteBook = async function (uid, notebookName) {  

    //check existed before adding
    let count = await this.findOne({ uid, "notebooks.name": notebookName }).count();
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
    
    console.log("In updateNoteBook: " + result);
    let count = result.nModified;
    return count;
}
//End Notebook region

//Begin Note region
userSchema.statics.getNoteContent = async function (uid, notebookName, noteTitle) {

    let notebooks = await this.findOne(
            {uid},
            {_id: 0, "notebooks": {$elemMatch: {name: notebookName}}},
        );
    console.log(notebooks);
    for (let notebook of notebooks.notebooks){
        for (let note of notebook.notes){
            if (note.title === noteTitle){
                return note;
            }
        }
    }
    
    return null;
}

userSchema.statics.addANote = async function (uid, notebookName, newNote) {
    //check existed before adding    
    let existedChecking = await this.getNoteContent(uid, notebookName, newNote.title);    
    if (existedChecking) {
        return false;
    }

    let currTime = new Date();
    newNote.created_at = currTime;
    newNote.updated_at = currTime;

    let result = await this.updateOne(
        {uid}, 
        {$push: {"notebooks.$[notebookFilter].notes": newNote}},
        {arrayFilters: [
            {"notebookFilter.name": notebookName}
            ]
        });

    console.log(result);
    return (result)?true:false;
}

userSchema.statics.updateNote = async function (uid, notebookName, noteTitle, newNote) {
    let result = await this.updateOne(
            {uid},
            {$set: 
                {
                    "notebooks.$[notebookFilter].notes.$[noteFilter].title": newNote.title,
                    "notebooks.$[notebookFilter].notes.$[noteFilter].content": newNote.content,
                    "notebooks.$[notebookFilter].notes.$[noteFilter].updated_at": new Date()
                }
            },
            {arrayFilters: [
                    {"notebookFilter.name": notebookName},
                    {"noteFilter.title": noteTitle}
                ]
            }
        );
    console.dir(result);
    return result.nModified;
}

userSchema.statics.deleteNote = async function (uid, notebookName, noteTitle) {
    let result = await this.updateOne(
            {uid},
            {$pull: 
                {
                    "notebooks.$[notebookFilter].notes": {title: noteTitle}
                }
            },
            {  
                arrayFilters: [
                    {"notebookFilter.name": notebookName}                    
                ]
            }
        );
    console.dir(result);
    return result.nModified;
}
//End Note region


userSchema.statics.getUserByUid = async function (uid) {
    const user = await this.findOne({ uid });
    return user;
}

userSchema.statics.createUser = async function(uid, email, hashedPwd) {
    return this.create({ uid, email, pwd: hashedPwd, notebooks: [] });
}

module.exports = mongoose.model('users', userSchema);
