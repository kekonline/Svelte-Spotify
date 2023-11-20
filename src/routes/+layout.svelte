<script lang="ts">
	//for nomalizing the css for all browsers
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.css';
	import type { LayoutData } from './$types';
	import { LogoutButton } from '$components';

	//we get this from the server side +layout.server.ts, that runs on every request
	export let data: LayoutData;

	$: user = data.user;
</script>

{#if user}
	<p>Hello {user.display_name}</p>
	<LogoutButton />
{/if}

<slot />
