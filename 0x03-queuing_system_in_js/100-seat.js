const express = require('express');
const queue = require('kue').createQueue();
const client = require('redis').createClient();

const app = express();
const { promisify } = require('util');

let reservationEnabled = true;

client.set('available_seats', 50);

function reserveSeat(number) {
  return promisify(client.SET).bind(client)('available_seats', number);
}

async function getCurrentAvailableSeats() {
  return promisify(client.GET).bind(client)('available_seats');
}

app.get('/available_seats', (req, res) => {
  getCurrentAvailableSeats().then((seats) => res.json({ numberOfAvailableSeats: seats }));
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
  } else {
    const job = queue.create('reserve_seat');
    job.on('enqueue', () => res.json({ status: 'Reservation in process' }))
      .on('failed', (error) => {
        console.log(`Seat reservation job ${job.id} failed: ${error}`);
      })
      .on('completed', (result) => console.log(`Seat reservation job ${job.id} completed`));
    job.save();
  }
});

app.get('/process', (req, res) => {
  queue.process('reserve_seat', (job, done) => {
    getCurrentAvailableSeats().then((seats) => {
      if (seats > 0) {
        reserveSeat(parseInt(seats) - 1).then(() => done());
      } else {
        done('Not enough seats available');
        reservationEnabled = false;
      }
    });
  });
  res.json({ status: 'Queue processing' });
});

app.listen(1245);
