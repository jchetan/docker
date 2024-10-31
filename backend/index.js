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

//get all keys
app.get(
    '/api/getkeys',
    (req, res) => {
        redis_client.keys('*', (err, keys) => {
            if (err) throw err;
            console.log("Inside get");            
            res.status(200).json({keys});            
        });
    }
);

//get value for a key
app.get(
    '/api/getvalue/:key',
    async (req, res) => {
        const { key } = req.params;
        try {
            redis_client.get(key, (err, value) => {
                console.log(err);
                const item = {
                    "key": key,
                    "value": value
                }
                res.status(200).json(item);
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// set key and value
app.post(
    '/api/additem',
    async (req, res) => {        
        const { key, value } = req.body;
        try {
            redis_client.set(key, value);
            res.status(200).json(req.body);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

app.listen(
    7000,
    () => {
        console.log('Listening on port 7000');
    }
);