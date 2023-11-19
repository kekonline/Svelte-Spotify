//https cookies normally are only available on the server
//the +layout.server will run everytime a request is made to the server

import type { LayoutServerLoad } from "./$types";
import { SPOTIFY_BASE_URL } from "$env/static/private";

//get the cookies to get the access token
export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
    const accessToken = cookies.get('access_token');

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
    } else {
        // the access token is invalid
        return {
            user: null
        }
    }
}