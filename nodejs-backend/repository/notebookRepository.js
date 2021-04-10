const User = require('../models/user');


//load notebook by uid
function getNoteBooks(db, uid, callback){
    // let cursor = db.aggregate([
    //     {$match: {"uid": uid}},
    //     {$project: 
    //         {
    //             _id: 0,
    //            "name" : "$notebooks.name",
    //             //"noteTitle": {$addToSet: "$notebooks.notes"}
    //         }    
    //     }
    // ]);

    // cursor.forEach(element => {
    //     console.log(element);
    // });

    User.findByUid(uid, (err, user) => {
        console.log(user);
    });

    callback();

}

module.exports = { getNoteBooks }