<script lang="ts">
	import '../app.css';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
    import { Navigation } from '@skeletonlabs/skeleton-svelte';
	
    import PanelLeftClose from '@lucide/svelte/icons/panel-left-close';
    import PanelLeftOpen from '@lucide/svelte/icons/panel-left-open';
    import IconMusic from '@lucide/svelte/icons/music';
    import Pill from '@lucide/svelte/icons/pill';
    import House from '@lucide/svelte/icons/house';
	import { SiGithub } from "@icons-pack/svelte-simple-icons";
	
	let { children } = $props();
    let value = $state('files');
	let drawerState = $state(false);

	function drawerClose() {
		drawerState = false;
	}
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<AppBar>
		{#snippet lead()}
			<PanelLeftOpen
				size={24}
				class="ml-2"
				onclick={() => {
					drawerState = true;
				}}
			/>
		{/snippet}
		{#snippet trail()}
			<a href="https://github.com/mikethesnowman" target="_blank" rel="noopener noreferrer"> <SiGithub size={24} /> </a>
			<!-- <Calendar size={20} />
			<CircleUser size={20} /> -->
		{/snippet}
		<span class="text-xl font-bold">Schrödinger Pharmaceuticals</span>
	</AppBar>

	<!-- Grid Columns -->
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<!-- Left Sidebar. -->
		<aside class="">
			<Modal
				open={drawerState}
				onOpenChange={(e) => (drawerState = e.open)}
				triggerBase="btn preset-tonal"
				contentBase="bg-surface-100-900 p-4 space-y-4 shadow-xl  h-screen"
				positionerJustify="justify-start"
				positionerAlign=""
				positionerPadding=""
				transitionsPositionerIn={{ x: -480, duration: 200 }}
				transitionsPositionerOut={{ x: -480, duration: 200 }}
			>
				{#snippet content()}
					<header class="flex justify-between">
						<!-- <h2 class="h2">Drawer Example</h2> -->
					</header>
					<Navigation.Rail {value} onValueChange={(newValue) => (value = newValue)}>
                        {#snippet header()}
                            <Navigation.Tile title="Menu" onclick={() => {
								drawerState = false;
							}}><PanelLeftClose /></Navigation.Tile>
                        {/snippet}
						{#snippet tiles()}
							<Navigation.Tile href="/" id="home" label="Home"><House /></Navigation.Tile>
							<Navigation.Tile href="/catalog" id="medicine" label="Medicine Catalog"><Pill /></Navigation.Tile>
							<Navigation.Tile id="music" label="Music"><IconMusic /></Navigation.Tile>
							<!-- <Navigation.Tile id="videos" label="Videos"><IconVideo /></Navigation.Tile> -->
						{/snippet}
					</Navigation.Rail>
					<footer>
						<button type="button" class="btn preset-filled" onclick={drawerClose}
							>Close Drawer</button
						>
					</footer>
				{/snippet}
			</Modal>
		</aside>
		<!-- Main Content -->
		<main class="space-y-4 p-4">
			{@render children()}

		</main>
	</div>
	<!-- Footer -->
	<footer class="p-4">Developed with ❤️ by <a href="https://github.com/mikethesnowman">MikeTheSnowman</a>... Please hire me!</footer>
</div>
