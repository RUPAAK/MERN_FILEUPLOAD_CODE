const mongoose= require('mongoose');

const schema= new mongoose.Schema({
    photo: {
        type: String
    }
})

const Database= new mongoose.model('Database', schema)

module.exports= Database