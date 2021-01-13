const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379

const client = redis.createClient(REDIS_PORT)
const app = express();

// Set response
function setRespone(username, repos) {
    return `<h2>${username} has ${repos} Github repos <h2>`
}

//Make request to GitHub for data
async function getRepos(req, res, next) {
    try {
        console.log('Fetching data ...');

        const { username } = req.params;

        const response = await fetch(`https://api.github.com/users/${username}`);

        const data = await response.json();

        const repos = data.public_repos
        //Set data to Redis
        client.setex(username, 3600, repos)

        res.send(setRespone(username, repos))
    }
    catch (err) {
        console.log(err);
        res.status(500)
    }
}
// Cache middleware
function cache(req, res, next) {
    const { username } = req.params;
  
    client.get(username, (err, data) => {
      if (err){ 
        res.send(err)
    };
  
      if (data !== null) {
        res.send(setRespone(username, data));
      } else {
        next();
      }
    });
  }
app.get('/repos/:username', cache, getRepos)
app.listen(3000, () => {
    console.log(`App listening on localhost:` + 3000);
})
