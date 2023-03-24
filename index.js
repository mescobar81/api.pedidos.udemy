const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const app = express();

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/restapis', {
});

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));
app.use('/', routes());

app.listen(5000);