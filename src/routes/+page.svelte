<script lang="ts">
	import jsonData from "$lib/apostles-creed-verses.json" assert { type: "json" };
	import CloseDialog from "$lib/components/CloseDialog.svelte";
	import DarkModeToggle from "$lib/components/SegmentControl.svelte/DarkModeToggle.svelte";
	import OrientationToggle from "$lib/components/SegmentControl.svelte/OrientationToggle.svelte";
	import DownArrow from "$lib/svgs/down-arrow.svelte";
	import LeftArrow from "$lib/svgs/left-arrow.svelte";
	import RightArrow from "$lib/svgs/right-arrow.svelte";
	import Settings from "$lib/svgs/settings.svelte";
	import UpArrow from "$lib/svgs/up-arrow.svelte";

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
	let orientation: "horizontal" | "vertical" = $state("horizontal");
	let touchStartX = 0;
	let touchStartY = 0;

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

	$effect(() => {
		if (orientation === "horizontal") {
			document.body.style.overflow = "hidden";
		} else if (orientation === "vertical") {
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
		if (orientation === "horizontal") {
			if (event.key === "ArrowRight") {
				event.preventDefault();
				goNext();
			} else if (event.key === "ArrowLeft") {
				event.preventDefault();
				goPrev();
			}
		} else if (orientation === "vertical") {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				goNext();
			} else if (event.key === "ArrowUp") {
				event.preventDefault();
				goPrev();
			}
		}
	}
	function handleTouchStart(event: TouchEvent) {
		if (mode !== "verse") return;
		touchStartX = event.changedTouches[0].screenX;
		touchStartY = event.changedTouches[0].screenY;
	}
	function handleTouchEnd(event: TouchEvent) {
		if (mode !== "verse") return;
		const touchEndX = event.changedTouches[0].screenX;
		const touchEndY = event.changedTouches[0].screenY;
		handleSwipe(touchEndX, touchEndY);
	}
	function handleSwipe(touchEndX: number, touchEndY: number) {
		if (orientation === "horizontal") {
			if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
				goNext();
			} else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
				goPrev();
			}
		} else if (orientation === "vertical") {
			if (touchStartY - touchEndY > SWIPE_THRESHOLD) {
				goNext();
			} else if (touchEndY - touchStartY > SWIPE_THRESHOLD) {
				goPrev();
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<main id="page">
	<dialog
		bind:this={dialogElement}
		onclose={() => (isSettingsOpen = false)}
	>
		<CloseDialog />
		<p id="settings-header">Settings</p>
		<hr />

		<div id="settings-grid">
			<label for="dark-mode">Theme</label>
			<DarkModeToggle bind:checked={isDarkMode} />

			<label for="orientation">Orientation</label>
			<OrientationToggle bind:orientation />
		</div>
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
			style:flex-direction={orientation === "vertical" ? "column" : "row"}
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}
		>
			<button
				class="nav"
				onclick={goPrev}
				disabled={lineNumber === 1}
			>
				{#if orientation === "horizontal"}
					<LeftArrow />
				{:else if orientation === "vertical"}
					<UpArrow />
				{/if}
			</button>
			<p>{data[`${lineNumber}`]}</p>
			<button
				class="nav"
				onclick={goNext}
				disabled={lineNumber === verseCount}
			>
				{#if orientation === "horizontal"}
					<RightArrow />
				{:else if orientation === "vertical"}
					<DownArrow />
				{/if}
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
		position: relative;
		border-radius: var(--border-radius-main);
		background-color: var(--color-bg);
		color: var(--color-text);
		border: none;
		padding: 1rem;
		min-width: 200px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		font-size: 0.8em;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(3px);
	}

	hr {
		border: none;
		border-top: 1px solid var(--color-text);
		opacity: 0.2;
		margin-block: 0.5rem;
	}

	#settings-header {
		margin-top: 0.4em;
		text-align: center;
		font-weight: bold;
		font-size: larger;
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
	button#reset {
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
		padding: 2em 1em;
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
