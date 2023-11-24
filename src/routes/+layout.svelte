<script lang="ts">
	//for nomalizing the css for all browsers
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.css';
	import type { LayoutData } from './$types';
	import { Navigation, Header } from '$components';
	//we get this from the server side +layout.server.ts, that runs on every request
	export let data: LayoutData;

	let topbar: HTMLElement;
	let scrollY: number;
	let headerOpacity = 0;

	//meaking a reactive topbar that changes the opacity of the header based on the scroll position
	$: if (topbar) {
		headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	$: user = data.user;
</script>

<!-- We bind scrollY to the window scroll -->
<svelte:window bind:scrollY />

<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		{#if user}
			<div id="topbar" bind:this={topbar}>
				<!-- Wee change the opacity of the topbar based on the scroll position -->
				<div
					class="topbar-bg"
					style:background-color="var(--header-color)"
					style:opacity={`${headerOpacity}`}
				/>
				<Header />
			</div>
		{/if}
		<main id="main-content" class:logged-in={user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		#content {
			flex: 1;
			#topbar {
				position: fixed;
				// have a variable for the height of the topbar
				height: var(--header-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 100;
				.topbar-bg {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: -1;
				}
				@include breakpoint.up('md') {
					padding: 0 30px;
					width: calc(100% - var(--sidebar-width));
				}
			}
			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&:logged-in {
					padding-top: calc(var(--header-height) + 30px);
				}
			}
		}
	}
</style>
