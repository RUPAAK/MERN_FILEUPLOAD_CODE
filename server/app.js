const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');
const path= require('path');

const Database= require('./modals/schema')

const app = express();

//use
app.use('/photos',express.static('uploads/images'))
app.use(cors())
app.use(express.json())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

var upload = multer({ storage: storage })

//routes
app.get('/', async (req, res) => {
    res.json({message: "Home Url"})
})
app.get('/get', async (req, res) => {
    const data= await Database.find({});
    res.send(data)
})

app.post('/post', upload.single('photo'), async (req, res) => {
    const photoUrl= `http://localhost:8000/photos/${req.file.filename}`;
    const item= new Database({photo: photoUrl})
    const saved= await item.save();
    res.json({data: saved})
    console.log(saved)
})

//database
mongoose.connect("mongodb://localhost:27017/photodb", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('CONNECTED TO DATABASE')).catch(() => console.log("FAILED TO CONNECT"))


app.listen(8000, () => console.log("LISTENEING TO PORT"))