const kue = require('kue');
const queue = kue.createQueue();

const blacklist = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  while (job.progress() <= 100) {
    console.log(job.process())
    if (blacklist.includes(phoneNumber)) {
        done(`Phone number ${phoneNumber} is blacklisted`);
    }
    if (job.progress == 50) {
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    }
  }
}

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
