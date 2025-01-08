import cron from 'node-cron'
import { cleanStoriesContainer, cleanStoryFromUser } from '../Controllers/story.controller.js'
import { cleanUsersDeletedPosts } from '../Controllers/user.controller.js'

const startCronJobs = () => {
    cron.schedule('* * * * *', async () => {
        await cleanStoriesContainer()
        await cleanStoryFromUser()
        await cleanUsersDeletedPosts()
    })
}

export default startCronJobs