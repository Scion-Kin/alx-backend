const kue = require('kue');
const queue = kue.createQueue();

const blacklist = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  let total = 2, pending = 2;
  while (pending !== 0) {
    if (total - pending <= total / 2) {
      job.progress(total - pending, total);
    }
    if (blacklist.includes(job.data.phoneNumber)) {
        done(`Phone number ${phoneNumber} is blacklisted`);
    }
    else {
      if (total == pending) {
        console.log(`Sending notification to ${job.data.phoneNumber}, with message: ${message}`);
      }
      done();
    }
    pending--;
  }
}

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
