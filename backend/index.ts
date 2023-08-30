import cron from 'node-cron';
import { dailyUpdate } from './db/db_ops';

cron.schedule('0 2,15 * * *', () => {
    /** Call daily API updates, updates at 2 AM and 3 PM  */
    dailyUpdate()
    .then(() => console.log('update succeeded!'))
    .catch((err) => console.log(err));
});
