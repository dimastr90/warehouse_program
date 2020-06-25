const {Schema, model} = require('mongoose');



const schema = new Schema({
    _id:{type:String, required: true},
    freeId:{type:Number, required: true}
},{
    versionKey: false
});

module.exports = model('services', schema)