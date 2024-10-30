const express = require('express');
const redis = require('redis');
const process = require('process');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors);
app.use(bodyParser.json);
const redis_client = redis.createClient({
    host: "redis",
    port: 6379
});
redis_client.set('visits', 0);

app.get(
    '/api',
    (req, res) => {
        try {
            const workouts = {
                name: "reps",
                id: 2
            };
            res.status(200).json(workouts);
        } catch (error) {
            res.status(400).json({ error: "error happened" });
        }
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