import adapter from '@sveltejs/adapter-auto';

// this is the default preprocessor
// import { vitePreprocess } from '@sveltejs/kit/vite';

// for scss preprocessor we need to use this
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors

	// this is the default preprocessor
	// preprocess: vitePreprocess(),

	// for scss preprocessor we need to use this
	preprocess: preprocess({
		// by puttind the @use here we dont need to import it everywhere and everytime
		// @unsass/breakpoint for making media queries in scss easier
		// @use "../styles/functions the scss functions file"
		scss: {
			prependData: '@use "src/styles/functions";@use "@unsass/breakpoint";'
		}
	}),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'$components': 'src/lib/components',
			'$assets': 'src/assets',
			'$actions': 'src/lib/actions',
		}
	}
};

export default config;
