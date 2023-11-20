//https cookies normally are only available on the server
//the +layout.server will run everytime a request is made to the server

import type { LayoutServerLoad } from "./$types";
import { SPOTIFY_BASE_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

//get the cookies to get the access token
export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
    const accessToken = cookies.get('access_token');
    const refreshToken = cookies.get('refresh_token');

    //if there is no access token, return null
    if (!accessToken) {
        return {
            user: null
        }
    }

    //if there is an access token, fetch the profile of the user
    const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
        //we need to send the access token in the headers
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if (profileRes.ok) {
        //using this type we can get data safty and auto complete
        const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
        return {
            user: profile
        }
        //if error is 401, it means the access token is invalid or expired but we have a refresh token
    } if (profileRes.status === 401 && refreshToken) {
        // refresh the token and try again
        // this endpoint will return a new access token by doing the refresh process
        const refreshRes = await fetch('/api/auth/refresh',)
        if (refreshRes.ok) {
            //as we refreshed the token, we can try again by reloading the page
            throw redirect(307, url.pathname);
        }
        return {
            user: null
        }
    }
}