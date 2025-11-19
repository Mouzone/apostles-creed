<script lang="ts">
	import Menu from "$lib/components/Menu.svelte";
	import All from "$lib/components/Modes/All.svelte";
	import Line from "$lib/components/Modes/Line.svelte";
	import Quiz from "$lib/components/Modes/Quiz.svelte";
	import type { Mode, Orientation } from "$lib/types";

	let mode: Mode = $state("all");
	let isDarkMode = $state(false);
	let orientation: Orientation = $state("horizontal");

	$effect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});
</script>

<main>
	{#if mode === "all"}
		<All />
	{:else if mode === "line"}
		<Line bind:orientation />
	{:else if mode === "quiz"}
		<Quiz />
	{/if}
	<Menu
		bind:mode
		bind:isDarkMode
		bind:orientation
	/>
</main>

<style>
	@font-face {
		font-family: "Merriweather";
		src: url("/Merriweather/Merriweather-VariableFont_opsz\,wdth\,wght.ttf")
			format("truetype");
		font-weight: 300 900;
		font-style: normal;
	}
	@font-face {
		font-family: "Open Sans";
		src: url("/Open_Sans/OpenSans-VariableFont_wdth\,wght.ttf")
			format("truetype");
		font-weight: 300 800;
		font-style: normal;
	}

	:root {
		--color-text: black;
		--color-bg: white;
		--border-main: solid var(--color-text) 0.15em;
		--border-radius-main: 0.5em;
		--btn-font-size: 0.7em;
	}

	:global(html) {
		background-color: var(--color-bg);
		color: var(--color-text);
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	:global(html.dark) {
		--color-text: #eee;
		--color-bg: #121212;
	}

	:global(body) {
		background-color: var(--color-bg);
		color: var(--color-text);
		margin: 0;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	main {
		width: 100dvw;
		box-sizing: border-box;
		font-family: "Open Sans";
		font-size: 1.35em;
		display: flex;
		justify-content: center;
		background-color: var(--color-bg);
		color: var(--color-text);
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	:global(button#mode:active, button#hover:active) {
		background-color: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-bg);
	}
	@media (hover: hover) {
		:global(button#mode:hover, button#hover:hover) {
			background-color: var(--color-text);
			color: var(--color-bg);
			border-color: var(--color-bg);
		}
	}
</style>
