const mongoose = require("mongoose");
 
const MultiplySchema = mongoose.Schema({
    firstArg: Number,
    secondArg: Number,
    result:Number
});

module.exports = mongoose.model('Multiply', MultiplySchema);
