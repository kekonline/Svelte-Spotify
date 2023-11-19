import { redirect } from "@sveltejs/kit";
//pkce to create the code challenge and the code verifier
import pkce from "pkce-gen";
import type { RequestHandler } from "./$types";
//environment variables Static - not changable during runtime - private are only on the server and in the .env file
import { SPOTIFY_APP_CLIENT_ID, BASE_URL } from "$env/static/private";

//all the permissions we are asking for from  spotify
const scope =
    'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read';

// generate a random string for state
const generateRandomString = (length: number) => {
    let randomString = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return randomString;
};

const state = generateRandomString(16);
const challenge = pkce.create();

//307 - Temporary Redirect
//redirect to spotify login page
export const GET: RequestHandler = ({ cookies }) => {

    //we are going to save the state in the cookies to be able to compare it after the spotify login fore security reasons
    //challenge.code_verifier is used to verify the code sent from spotify
    cookies.set('spotify_auth_state', state)
    cookies.set('spotify_auth_challenge_verifier', challenge.code_verifier)

    throw redirect(307, `http://accounts.spotify.com/authorize?${new URLSearchParams({
        //code is what we get back from spotify, that will be used to get our access refresh token and access token
        response_type: "code",
        client_id: SPOTIFY_APP_CLIENT_ID,
        scope,
        //redirect uri is the url we will be redirected to after login from spotify
        redirect_uri: `${BASE_URL}/api/auth/callback`,
        //state is a random string for security purposes 
        state,
        //The "S256" value indicates that the SHA-256 hashing algorithm is used for this transformation
        code_challenge_method: "S256",
        code_challenge: challenge.code_challenge
    })
        }`);
}