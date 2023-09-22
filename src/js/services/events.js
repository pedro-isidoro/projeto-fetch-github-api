import { baseUrl, maxEventsItems } from '../variables.js'

async function getEvents(userName){
    const events = await fetch(`${baseUrl}/${userName}/events?per_page=${maxEventsItems}`)
    return await events.json()
}

export { getEvents }