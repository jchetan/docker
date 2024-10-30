const express = require('express');
const redis = require('redis');
const process = require('process');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors);
app.use(bodyParser.json);
const redis_client = redis.createClient({
    host: "redis-server",
    port: 6379
});
redis_client.set('visits', 0);

app.get(
    '/',
    (req, res) => {
        redis_client.get('visits', (err, visits) => {
            res.send('Hi There no of visits is:' + visits);
            redis_client.set('visits', parseInt(visits) + 1);
        });
    }
);

app.get(
    '/crash',
    (req, res) => {
        process.exit(0);
    }
);

app.post(
    '/value',
    async (req, res) => {
        const key = req.body.key;
        const value = req.body.value;
        await redis_client.set(key, value);
        res.send('Success');
    }
);

app.listen(
    5000,
    () => {
        console.log('Listening on port 5000');
    }
);