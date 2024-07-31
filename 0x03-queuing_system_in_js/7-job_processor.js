const kue = require('kue');

const queue = kue.createQueue();

const blacklist = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  const total = 2; let
    pending = 3;
  while (pending !== 0) {
    pending--;
    if (total - pending <= total / 2) {
      job.progress(total - pending, total);
    }
    if (blacklist.includes(phoneNumber)) {
      done(`Phone number ${phoneNumber} is blacklisted`);
      break;
    } else {
      if (total == pending) {
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
      }
      done();
    }
  }
}

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
