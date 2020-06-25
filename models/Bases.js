const {Schema, model} = require('mongoose');



const schema = new Schema({
    _id:{type:String, required: true},
    items:{type:[], default:void 0}
},{
    versionKey: false
});

module.exports = model('bases', schema)