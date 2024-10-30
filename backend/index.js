const express = require('express');
const app = express();
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
const redis_client = redis.createClient({
    host: "redis",
    port: 6379
});
redis_client.set('visits', 0);

app.get(
    '/api',
    (req, res) => {
        console.log("Inside get")
        res.send("Hi Geetha and Chetan");
    }
);

app.listen(
    7000,
    () => {
        console.log('Listening on port 7000');
    }
);