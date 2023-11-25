import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export default async function fetchRefresh(
    fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
    path: string
) {
    const req = fetch(path);
    //do nothing if we are not in the browser
    if (!browser) return req;


    const res = await req;
    if (res.status === 401) {
        //we save the promise in the window so multiple refresh calls dont make obsolete ower token
        //with the if we make sure that the refresh promise is only called once
        if (!window.refreshPromise) {
            window.refreshPromise = fetch('/api/auth/refresh').finally(() => {
                window.refreshPromise = null;
            });
        }
        const refreshRes = await window.refreshPromise;
        if (!refreshRes.ok) throw error(401, 'Session Expired!');
        return fetch(path);
    } else {
        return res;
    }
}