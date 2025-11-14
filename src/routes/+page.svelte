<script>
	import data from "$lib/apostles-creed-verses.json";
	import LeftArrow from "$lib/svgs/left-arrow.svelte";
	import RightArrow from "$lib/svgs/right-arrow.svelte";

	let mode = $state("all");
	let lineNumber = $state(1);

	let touchStartX = 0;

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
		lineNumber = Math.min(lineNumber, Object.entries(data).length);
	}

	function handleKeydown(event) {
		// Only navigate if we are in 'verse' mode
		if (mode !== "verse") return;

		if (event.key === "ArrowRight") {
			event.preventDefault(); // Stop page from scrolling
			goNext();
		} else if (event.key === "ArrowLeft") {
			event.preventDefault(); // Stop page from scrolling
			goPrev();
		}
	}

	function handleTouchStart(event) {
		if (mode !== "verse") return;
		touchStartX = event.changedTouches[0].screenX;
	}

	function handleTouchEnd(event) {
		if (mode !== "verse") return;
		const touchEndX = event.changedTouches[0].screenX;
		handleSwipe(touchEndX);
	}

	function handleSwipe(touchEndX) {
		const threshold = 50;

		// Swiped left
		if (touchStartX - touchEndX > threshold) {
			goNext();
		}
		// Swiped right
		else if (touchEndX - touchStartX > threshold) {
			goPrev();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div id="page">
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
				disabled={lineNumber === Object.entries(data).length}
			>
				<RightArrow />
			</button>
		</div>
	{/if}
</div>

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
	#page {
		width: 100dvw;
		box-sizing: border-box;

		font-family: "Open Sans";
		font-size: 1.35em;

		display: flex;
		justify-content: center;
	}

	button#mode {
		width: 2.5em;
		height: 2.5em;

		position: absolute;
		top: 1em;

		appearance: none;
		border: none;
		background-color: black;
		color: white;
		border-radius: 1.5em;

		font-size: 0.6em;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
		width: 100dvw;

		margin: 0 1em 0 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}
	button.nav {
		appearance: none;
		border: none;
		background-color: transparent;
	}
	button.nav:disabled {
		opacity: 30%;
	}
	@media (max-width: 640px) {
		.verse {
			margin: 0.7em;
		}
	}
</style>
