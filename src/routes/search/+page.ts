import type { PageLoad } from './$types'

//+page.ts will run everytime a request in the client or server like this we can access data from our event
export const load: PageLoad = () => {
    return {
        title: "Search"
    }
}