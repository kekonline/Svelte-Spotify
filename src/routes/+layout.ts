import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

//+layout.ts will run everytime a request in the client or server
//we also have access to the returned data from +layout.server.ts by accessing data from our event
export const load: LayoutLoad = ({ data, url }) => {
    const { user } = data || {};

    //307 means temporary redirect

    //login in user login to homepage
    if (user && url.pathname === '/login') {
        throw redirect(307, '/');
    }

    //if user is not logged in, redirect to login
    if (!user && url.pathname !== '/login') {
        throw redirect(307, '/login');
    }

    //if we have both a shared load (*.ts) and a server load(*.server.ts), we need to return the data
    return {
        user
    }

}