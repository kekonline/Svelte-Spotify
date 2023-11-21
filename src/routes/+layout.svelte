<script lang="ts">
	//for nomalizing the css for all browsers
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.css';
	import type { LayoutData } from './$types';

	//we get this from the server side +layout.server.ts, that runs on every request
	export let data: LayoutData;

	$: user = data.user;
</script>

<div id="main">
	<div id="content">
		<main id="main-content">
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		#content {
			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
			}
		}
	}
</style>
