<script lang="ts">
	import Menu from "$lib/components/Menu.svelte";
	import All from "$lib/components/Modes/All.svelte";
	import Line from "$lib/components/Modes/Line.svelte";
	import Quiz from "$lib/components/Modes/Quiz.svelte";
	import type { Mode, Orientation } from "../types";

	let mode: Mode = $state("all");
	let isDarkMode = $state(false);
	let orientation: Orientation = $state("horizontal");
	let isSettingsOpen = $state(false);

	$effect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});

	$effect(() => {
		if (isSettingsOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
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
		bind:isSettingsOpen
		bind:orientation
	/>
</main>

<style>
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

	:global(body) {
		background-color: var(--color-bg);
		color: var(--color-text);
		margin: 0;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	:global(html.dark) {
		--color-text: #eee;
		--color-bg: #121212;
	}

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
</style>
