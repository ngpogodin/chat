require('dotenv').config();
const express = require('express');
const app = express();
const websocket = require('./websocket/index');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);


mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('mongoDB connected'));





const server = app.listen(PORT, () => {
    console.log('server start')
})

websocket(server)