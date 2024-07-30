const kue = require('kue');
const queue = kue.createQueue();

const jobs = [];
const phones = ['4153518780', '4153518781', '4153518743', '4153538781', '4153118782', '4153718781', '4159518782',
                '4158718781', '4153818782', '4154318781', '4151218782']

for (let i = 0; i < phones.length; i++) {
  const code = i === 0 ? 1234 : i % 2 === 0 ? 4321 : 4562;
  jobs.push({
    phoneNumber: phones[i],
    message: `This is the code ${code} to verify your account`
  })
}

for (const obj in jobs) {
  const job = queue.create('push_notification_code_2', obj);
  job
    .on('enqueue', () => {
      console.log(`Notification job created: ${job.id}`);
    })
    .on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    })
    .on('failed', (err) => {
      console.log(`Notification job ${job.id}, failed: ${err.message || err.toString()}`);
    })
    .on('progress', (progress, _data) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  job.save();
}
