<script lang="ts">
	//for nomalizing the css for all browsers
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.css';
	import type { LayoutData } from './$types';

	//we get this from the server side +layout.server.ts, that runs on every request
	export let data: LayoutData;
</script>

{data.user?.display_name}

<slot />
