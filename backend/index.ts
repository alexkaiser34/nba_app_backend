import cron from 'node-cron';

cron.schedule('0 2,15 * * *', () => {
    /** TODO: Call daily API updates, updates at 2 AM and 3 PM  */
  console.log('running a task');
});
