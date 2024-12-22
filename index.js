const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {mouldProductAssignmentData} = require('./mouldData');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

app.get('/getReservations', (req, res) => {
    const data = mouldProductAssignmentData();
    const serializedData = Object.fromEntries(data);
    return res.status(200).json(serializedData);
})

app.get('/', (req, res) => {
    return res.status(200).json({"status": "working"});
})

app.post('/data', (req, res) => {
    return res.status(200).json('Data received');
})

app.listen(PORT, () => {
    console.log("App is up and running at port:", PORT);
})