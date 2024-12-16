import cron from 'node-cron'
import { cleanStoriesContainer, cleanStoryFromUser } from '../Controllers/story.controller.js'

const startCronJobs = () => {
    cron.schedule('* * * * *', async () => {
        await cleanStoriesContainer()
        await cleanStoryFromUser()
    })
}

export default startCronJobs