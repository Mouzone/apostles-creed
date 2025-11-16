<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import Toggle from "$lib/components/Toggle.svelte";
	import LeftArrow from "$lib/svgs/left-arrow.svelte";
	import RightArrow from "$lib/svgs/right-arrow.svelte";

	// --- Types ---
	type VerseData = Record<string, string>;
	type Mode = "all" | "verse";
	// --- Constants ---
	const data: VerseData = jsonData;
	const verseCount = Object.keys(data).length;
	const SWIPE_THRESHOLD = 50;
	// --- State ---
	let mode: Mode = $state("all");
	let lineNumber = $state(1);
	let isDarkMode = $state(false);
	let touchStartX = 0;

	// --- Functions (Unchanged) ---
	function goPrev() {
		lineNumber -= 1;
		if (data[`${lineNumber}`] === " ") {
			lineNumber -= 1;
		}
		lineNumber = Math.max(1, lineNumber);
	}
	function goNext() {
		lineNumber += 1;
		if (data[`${lineNumber}`] === " ") {
			lineNumber += 1;
		}
		lineNumber = Math.min(lineNumber, verseCount);
	}
	function handleKeydown(event: KeyboardEvent) {
		if (mode !== "verse") return;
		if (event.key === "ArrowRight") {
			event.preventDefault();
			goNext();
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			goPrev();
		}
	}
	function handleTouchStart(event: TouchEvent) {
		if (mode !== "verse") return;
		touchStartX = event.changedTouches[0].screenX;
	}
	function handleTouchEnd(event: TouchEvent) {
		if (mode !== "verse") return;
		const touchEndX = event.changedTouches[0].screenX;
		handleSwipe(touchEndX);
	}
	function handleSwipe(touchEndX: number) {
		if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
			goNext();
		} else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
			goPrev();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main
	id="page"
	class:dark={isDarkMode}
>
	<button
		id="mode"
		onclick={() => {
			mode = mode === "all" ? "verse" : "all";
			lineNumber = 1;
		}}
	>
		{#if mode === "all"}
			All
		{:else}
			1
		{/if}
	</button>
	{#if mode === "all"}
		<div id="verses">
			{#each Object.values(data) as verse, i}
				{#if verse === " "}
					<br />
				{:else}
					<p
						class="verse"
						data-line={i}
					>
						{verse}
					</p>
				{/if}
			{/each}
		</div>
	{:else}
		<div
			id="single-verse"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}
		>
			<button
				class="nav"
				onclick={goPrev}
				disabled={lineNumber === 1}
			>
				<LeftArrow />
			</button>
			<p>{data[`${lineNumber}`]}</p>
			<button
				class="nav"
				onclick={goNext}
				disabled={lineNumber === verseCount}
			>
				<RightArrow />
			</button>
		</div>
		{#if lineNumber === verseCount}
			<button
				id="reset"
				onclick={() => (lineNumber = 1)}
			>
				Reset
			</button>
		{/if}
	{/if}
	<Toggle bind:checked={isDarkMode} />
</main>

<style>
	:root {
		--color-text: black;
		--color-bg: white;
		--border-main: solid var(--color-text) 0.15em;
		--border-radius-main: 0.5em;
		--btn-font-size: 0.7em;
	}

	/* UPDATED: Softer, more comfortable dark mode colors */
	main.dark {
		--color-text: #eee;
		--color-bg: #121212;
	}

	/* --- Fonts (Unchanged) --- */
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

	#page {
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

	/* --- Button Styles --- */
	button#mode,
	button#reset {
		width: 3.5em;
		height: 2.5em;
		position: absolute;
		appearance: none;
		background-color: var(--color-bg);
		color: var(--color-text);
		border: var(--border-main);
		border-radius: var(--border-radius-main);
		font-size: var(--btn-font-size);
		border-color: var(--color-text);
	}

	/* UPDATED: Centered to match screenshot */
	button#mode {
		top: 1.9em;
		left: 50%;
		transform: translateX(-50%);
	}
	button#reset {
		bottom: 17em;
	}

	/* UPDATED: Added border-color to fix hover */
	button#mode:hover,
	button#reset:hover {
		background-color: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-bg); /* This fixes the disappearing border */
	}

	/* UPDATED: Added color to theme the SVG arrows */
	button.nav {
		appearance: none;
		border: none;
		background-color: transparent;
		color: var(--color-text); /* This will color the SVG icons */
	}
	button.nav:disabled {
		opacity: 30%;
	}

	/* --- Layout (Unchanged) --- */
	#verses {
		margin: 4em 1em 1em 1em;
	}
	p {
		margin: 0;
	}
	.verse {
		margin: 0.35em;
	}
	#single-verse {
		height: 100dvh;
		width: 100%;
		box-sizing: border-box;
		padding: 0 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	/* NEW: Positions the toggle from the page */
	main > :global(label.toggle-switch) {
		position: absolute;
		top: 1.5em;
		right: 1.5em;
	}

	/* --- Media Query (Unchanged) --- */
	@media (max-width: 640px) {
		.verse {
			margin: 0.7em;
		}
		button#reset {
			bottom: 21em;
		}
	}
</style>
