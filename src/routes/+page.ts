import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
    //we reanmed fetch to fetchRefresh to use the refresh token
    const fetch = (path: string) => fetchRefresh(_fetch, path);
    const { user } = await parent();
    const newReleases = fetch('/api/spotify/browse/new-releases?limit=6');
    const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=6');
    const userPlaylists = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`);

    const catsRes = await fetch(`api/spotify/browse/categories`);
    const catsResJSON: SpotifyApi.MultipleCategoriesResponse | undefined = catsRes.ok
        ? await catsRes.json()
        : undefined;

    //sort 0.5 will shuffle the array
    //then we get the first 3 categories
    const randomCats = catsResJSON
        ? catsResJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3)
        : [];

    //we use map to create an array of promises
    const randomCatsPromises = randomCats.map((cat) =>
        fetch(`/api/spotify/browse/categories/${cat.id}/playlists?limit=6`)
    );

    //we use promise.all to wait for all the promises to resolve and desctructure the responses, and spreading the categories
    const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes, ...randomCatsRes] =
        await Promise.all([newReleases, featuredPlaylists, userPlaylists, ...randomCatsPromises]);


    //we use the as to get the type and auto complete
    return {
        newReleases: newReleasesRes.ok
            ? (newReleasesRes.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
            : undefined,
        featuredPlaylists: featuredPlaylistsRes.ok
            ? (featuredPlaylistsRes.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
            : undefined,
        userPlaylists: userPlaylistsRes.ok
            ? (userPlaylistsRes.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse>)
            : undefined,
        homeCategories: randomCats,
        categoriesPlaylists: Promise.all(
            randomCatsRes.map((res) =>
                res.ok ? (res.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>) : undefined
            )
        )
    };
};