const { createClient, print } = require('redis');

const client = createClient();

client.on('error', err => console.log(`Redis client not connected to the server: ${err}`));
client.on('connect', () => console.log(`Redis client connected to the server`));

const cities = {
    Portland: 50,
    Seattle: 80,
    "New York": 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2
}

for (let i in cities) {
    client.hset("HolbertonSchools", i, cities[i], print);
}

client.hgetall("HolbertonSchools", (error, response) => console.log(response));