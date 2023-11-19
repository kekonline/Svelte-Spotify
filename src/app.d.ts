// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// Data definition for PageData from package @types/spotify 
		interface PageData {
			user: SpotifyApi.CurrentUsersProfileResponse | null;
		}
		// interface Platform {}
	}
}

export { };
