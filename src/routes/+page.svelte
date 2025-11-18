<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import Toggle from "$lib/components/Toggle.svelte";
	import LeftArrow from "$lib/svgs/left-arrow.svelte";
	import RightArrow from "$lib/svgs/right-arrow.svelte";
	import Settings from "$lib/svgs/settings.svelte";

	type VerseData = Record<string, string>;
	type Mode = "all" | "verse";

	const data: VerseData = jsonData;
	const verseCount = Object.keys(data).length;
	const SWIPE_THRESHOLD = 50;

	let dialogElement: null | HTMLDialogElement = $state(null);
	let mode: Mode = $state("all");
	let lineNumber = $state(1);
	let isDarkMode = $state(false);
	let isSettingsOpen = $state(false);
	let touchStartX = 0;

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

<main id="page">
	<dialog
		bind:this={dialogElement}
		onclose={() => (isSettingsOpen = false)}
	>
		<h2>Settings</h2>
		<hr />

		<div id="settings-grid">
			<label for="dark-mode">Dark Mode</label>
			<Toggle bind:checked={isDarkMode} />

			<label for="orientation">Orientation</label>
			<select id="orientation">
				<option value="en">left, right</option>
				<option value="es">right, left</option>
			</select>
		</div>

		<hr />
		<form
			method="dialog"
			class="button-row"
		>
			<button id="close">Close</button>
		</form>
	</dialog>
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
	<div id="menu">
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
		<button
			id="settings"
			onclick={() => {
				dialogElement?.showModal();
				isSettingsOpen = true;
			}}
		>
			<Settings />
		</button>
	</div>
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

	dialog {
		border-radius: var(--border-radius-main);
		background-color: var(--color-bg);
		color: var(--color-text);
		border: none;
		padding: 1.5rem;
		min-width: 300px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(3px);
	}

	h2 {
		text-align: center;
		margin: 0;
	}

	.button-row {
		display: flex;
		justify-content: center;
		margin-top: 0.5rem;
	}

	hr {
		border: none;
		border-top: 1px solid var(--color-text);
		opacity: 0.2;
		margin-block: 0.5rem;
	}

	#settings-grid {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
		padding-block: 0.5rem;
		justify-items: center;
	}

	#settings-grid label {
		font-weight: 500;
		justify-self: start;
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

	button {
		padding: 0;
		margin: 0;
	}
	button#mode,
	button#reset,
	button#close {
		width: 3.5em;
		height: 2.5em;
		appearance: none;
		background-color: var(--color-bg);
		color: var(--color-text);
		border: var(--border-main);
		border-radius: var(--border-radius-main);
		font-size: var(--btn-font-size);
		border-color: var(--color-text);
	}

	button#settings {
		appearance: none;
		border: none;
		background-color: transparent;
		color: var(--color-text);
	}

	div#menu {
		position: fixed;
		bottom: 1em;
		right: 1em;
		display: flex;
		align-items: center;
		gap: 0.3em;
	}
	button#reset {
		position: absolute;
		bottom: 17em;
	}

	button#close:hover,
	button#mode:hover,
	button#reset:hover {
		background-color: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-bg);
	}

	button.nav {
		appearance: none;
		border: none;
		background-color: transparent;
		color: var(--color-text);
	}
	button.nav:disabled {
		opacity: 30%;
	}

	#verses {
		margin: 2em 1em 1em 1em;
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

	@media (max-width: 640px) {
		.verse {
			margin: 0.7em;
		}
		button#reset {
			bottom: 21em;
		}
	}
</style>
