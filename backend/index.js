const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
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

app.listen(
    8080,
    () => {
        console.log('Listening on port 8080');
    }
);